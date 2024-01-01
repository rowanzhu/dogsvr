# dogsvr
dogsvr is a game server package based on nodejs, and makes writing game server easier for rapid development of small teams.

# features
- Adapt to multiple connection methods
- User-defined protocol serialization
- Hot update server logic

# usage
1. installing dogsvr
```
npm install dogsvr
```
2. creating 2 files at least, one is main thread file, the other is worker thread file

3. writing main thread file
```ts
import * as dogsvr from 'dogsvr/main_thread';

const connLayer: dogsvr.TsrpcCL = new dogsvr.TsrpcCL(3000); // connection layer using tsrpc
const mainThreadInfo: dogsvr.MainThreadInfo =
{
    workerThreadRunFile: "./test_svr_logic.js", // worker thread file name
    workerThreadNum: 2,
    connLayer: connLayer,
}
dogsvr.startServer(mainThreadInfo);
```
4. writing worker thread file
```ts
import * as dogsvr from 'dogsvr/worker_thread';

// register command handler
dogsvr.regCmdHandler(10001, async (reqMsg: dogsvr.Msg, innerReq: dogsvr.MsgBodyType) => {
    const req = JSON.parse(innerReq as string);

    const res = {res: "I am dog"};
    dogsvr.respondCmd(reqMsg, JSON.stringify(res));
})
```
5. run server by pm2
```sh
pm2 start test_svr.js  #test_svr.js is main thread file
pm2 trigger test_svr hotUpdate  #hot update when any logic file has been changed
```
Please see the examples folder for complete codes.

# architecture
TODO
