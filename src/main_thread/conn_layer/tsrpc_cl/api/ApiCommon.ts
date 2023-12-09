import { ApiCall } from 'tsrpc';
import { Msg } from '../../../../message';
import { sendMsgToWorkerThread } from '../../../index';
import { ReqCommon, ResCommon } from '../shared/protocols/PtlCommon';

export async function ApiCommon(call: ApiCall<ReqCommon, ResCommon>) {
    let reqMsg = new Msg(call.req.cmdId, 0, call.req.innerReq);
    let resMsg = await sendMsgToWorkerThread(reqMsg);
    call.succ({ cmdId: resMsg.cmdId, innerRes: resMsg.body });
}
