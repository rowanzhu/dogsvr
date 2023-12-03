class DTrans {
    transId: number;
    callback: Function;

    constructor(transId: number, callback: Function) {
        this.transId = transId;
        this.callback = callback;
    }
}

type DTransMapType = { [key: number]: DTrans }

export class DTransMgr {
    transMap: DTransMapType = {};
    currTransId = 0;
    readonly maxTransId = 4200000000;

    constructor() {
    }

    private genNewTransId(): number {
        if (this.currTransId >= this.maxTransId) {
            this.currTransId = 0;
        }
        return ++this.currTransId;
    }

    addTrans(callback: Function) {
        let transId = this.genNewTransId();
        if (this.transMap[transId]) {
            throw new Error('Transaction already exists');
        }
        this.transMap[transId] = new DTrans(transId, callback);
    }

    onWorkerThreadMsg(msg: any) {
        if (msg.type === 'transaction') {
            let transId = msg.transId;
            if (this.transMap[transId]) {
                this.transMap[transId].callback(msg.data);
                delete this.transMap[transId];
            }
        }
    }
}