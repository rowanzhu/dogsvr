import { Worker } from "worker_threads"
import { BaseCL } from "./conn_layer/base_cl";
import { TxnMgr } from "./transaction";
import { Msg } from "../message";

export interface MainThreadInfo {
    workerThreadRunFile: string;
    workerThreadNum: number;
    connLayer: BaseCL;
}
let mtInfo: MainThreadInfo | null = null;

export async function startServer(info: MainThreadInfo) {
    mtInfo = info;
    await startWorkerThreads();
    await mtInfo.connLayer.startListen();
    console.log("start dog server successfully");
}

const workerThreads: Worker[] = [];
const txnMgr: TxnMgr = new TxnMgr();

async function startWorkerThreads() {
    for (let i = 0; i < mtInfo!.workerThreadNum; ++i) {
        const worker = new Worker(mtInfo!.workerThreadRunFile);
        workerThreads.push(worker);
        worker.on("message", (msg: Msg) => {
            txnMgr.onWorkerThreadMsg(msg);
        });
    }
}

let roundRobinIndex = 0;
function getWorkerThread(): Worker {
    roundRobinIndex = (roundRobinIndex + 1) % workerThreads.length;
    return workerThreads[roundRobinIndex];
}

export function sendMsgToWorkerThread(msg: Msg): Promise<Msg> {
    return new Promise((resolve, reject) => {
        msg.txnId = txnMgr.genNewTxnId();
        let worker = getWorkerThread();
        worker.postMessage(msg);
        txnMgr.addTxn(msg.txnId, resolve);
    });
}
