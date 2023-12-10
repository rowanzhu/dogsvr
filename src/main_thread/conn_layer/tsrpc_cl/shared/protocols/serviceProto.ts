import { ServiceProto } from 'tsrpc-proto';
import { ReqCommon, ResCommon } from './PtlCommon';

export interface ServiceType {
    api: {
        "Common": {
            req: ReqCommon,
            res: ResCommon
        }
    },
    msg: {

    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 1,
    "services": [
        {
            "id": 0,
            "name": "Common",
            "type": "api"
        }
    ],
    "types": {
        "PtlCommon/ReqCommon": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "cmdId",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "innerReq",
                    "type": {
                        "type": "Reference",
                        "target": "../../../../../message/MsgBodyType"
                    }
                }
            ]
        },
        "../../../../../message/MsgBodyType": {
            "type": "Union",
            "members": [
                {
                    "id": 0,
                    "type": {
                        "type": "Buffer",
                        "arrayType": "Uint8Array"
                    }
                },
                {
                    "id": 1,
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlCommon/ResCommon": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "cmdId",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "innerRes",
                    "type": {
                        "type": "Reference",
                        "target": "../../../../../message/MsgBodyType"
                    }
                }
            ]
        }
    }
};