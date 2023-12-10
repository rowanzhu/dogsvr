import * as dogsvr from 'dogsvr/main_thread';

const connLayer: dogsvr.TsrpcCL = new dogsvr.TsrpcCL(3000);
const mainThreadInfo: dogsvr.MainThreadInfo =
{
    workerThreadRunFile: "./test_svr_logic.js",
    workerThreadNum: 2,
    connLayer: connLayer,
}

dogsvr.startServer(mainThreadInfo);
