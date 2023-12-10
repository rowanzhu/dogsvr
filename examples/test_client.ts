import { WsClient } from 'tsrpc';
import { serviceProto } from 'dogsvr/main_thread/conn_layer/tsrpc_cl/shared/protocols/serviceProto';

const client = new WsClient(serviceProto, {
    server: 'ws://127.0.0.1:3000'
});

async function Call() {
    let connRes = await client.connect();
    if (!connRes.isSucc) {
        console.error('connect failed', connRes.errMsg);
    }

    const req = {req: "Who are you"};
    let ret = await client.callApi('Common', {
        cmdId: 1001,
        innerReq: JSON.stringify(req)
    });

    if (!ret.isSucc) {
        console.log('call failed', ret.err.message);
        return;
    }

    console.log(JSON.parse(ret.res.innerRes as string));
}

Call();
