export class Msg {
    constructor(
        public cmdId: number,
        public txnId: number,
        public body: Uint8Array
    ) {
    }
}
