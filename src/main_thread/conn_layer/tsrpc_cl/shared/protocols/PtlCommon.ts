export interface ReqCommon {
    cmdId: number,
    innerReq: Uint8Array
}

export interface ResCommon {
    cmdId: number,
    innerRes: Uint8Array
}
