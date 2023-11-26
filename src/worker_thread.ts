export class DWorkerThread {
    private static instance: DWorkerThread;

    private constructor() {
    }

    public static getInst(): DWorkerThread {
        if (!DWorkerThread.instance) {
            DWorkerThread.instance = new DWorkerThread();
        }
        return DWorkerThread.instance;
    }

    regCmdHandler() {
        console.log("regCmdHandler");
    }
}
