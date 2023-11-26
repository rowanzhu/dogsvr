export class DMainThread {
    private static instance: DMainThread;

    private constructor() {
    }

    public static getInst(): DMainThread {
        if (!DMainThread.instance) {
            DMainThread.instance = new DMainThread();
        }
        return DMainThread.instance;
    }

    async init() {
        // setWorkerThreadRunFile(file_name: string) 
        // setConnLayer()
    }

    startServer() {
        console.log("startServer");
    }
}
