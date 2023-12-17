import * as dogsvr from 'dogsvr/worker_thread';
import { threadId } from 'worker_threads';

dogsvr.regCmdHandler(1001, async (reqMsg: dogsvr.Msg, innerReq: dogsvr.MsgBodyType) => {
    const req = JSON.parse(innerReq as string);
    console.log(threadId, 'req', req);

    const res = {res: "I am dog"};
    dogsvr.respondCmd(reqMsg, JSON.stringify(res));
})
