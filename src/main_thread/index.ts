import { BaseConnLayer } from "./conn_layer/base_cl";
import { Worker } from "node:worker_threads"
import { DTransMgr } from "./transaction";

export interface MainThreadInfo {
    workerThreadRunFile: string;
    workerThreadNum: number;
    connLayer: BaseConnLayer;
}
let mtInfo: MainThreadInfo = null;

export async function startServer(info: MainThreadInfo) {
    mtInfo = info;
    await startWorkerThreads();
    await mtInfo.connLayer.startListen();
    console.log("start dog server successfully");
}

const workerThreads: Worker[] = [];
const transMgr: DTransMgr = new DTransMgr();

async function startWorkerThreads() {
    for (let i = 0; i < mtInfo.workerThreadNum; ++i) {
        const worker = new Worker(mtInfo.workerThreadRunFile);
        workerThreads.push(worker);
        worker.on("message", (msg) => {
            transMgr.onWorkerThreadMsg(msg);
        });
    }
}

let roundRobinIndex = 0;
function getWorkerThread(): Worker {
    roundRobinIndex = (roundRobinIndex + 1) % workerThreads.length;
    return workerThreads[roundRobinIndex];
}

export function sendMsgToWorkerThread(msg): Promise<void> {
    return new Promise((resolve, reject) => {
        let worker = getWorkerThread();
        worker.postMessage(msg);
        transMgr.addTrans(resolve);
    });
}
