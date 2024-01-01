import * as dogsvr from 'dogsvr/worker_thread';

dogsvr.regCmdHandler(10001, async (reqMsg: dogsvr.Msg, innerReq: dogsvr.MsgBodyType) => {
    const req = JSON.parse(innerReq as string);
    dogsvr.infoLog('req', req);

    const res = {res: "I am dog new"};
    dogsvr.respondCmd(reqMsg, JSON.stringify(res));
})
