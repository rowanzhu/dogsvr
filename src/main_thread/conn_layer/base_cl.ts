export abstract class BaseConnLayer {
    abstract startListen(): Promise<void>;
}