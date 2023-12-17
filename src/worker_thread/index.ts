import { parentPort } from 'worker_threads';
import { Msg, MsgBodyType } from '../message';

export type HandlerType = (reqMsg: Msg, innerReq: MsgBodyType) => Promise<void>;
type HandlerMapType = { [key: number]: HandlerType }
let handlerMap: HandlerMapType = {};

export function regCmdHandler(cmdId: number, handler: HandlerType) {
    if (handlerMap[cmdId]) {
        throw new Error(`Handler for cmdId ${cmdId} already exists`);
    }
    handlerMap[cmdId] = handler;
}

parentPort!.on('message', (msg: Msg) => {
    const handler = handlerMap[msg.cmdId];
    if (handler) {
        handler(msg, msg.body);
    } else {
        throw new Error(`No handler for cmdId ${msg.cmdId}`);
    }
}
);

export function respondCmd(reqMsg: Msg, innerRes: MsgBodyType) {
    reqMsg.body = innerRes;
    parentPort!.postMessage(reqMsg);
}

export * from "../message"
