export const LOG_LEVEL_TRACE = 10;
export const LOG_LEVEL_DEBUG = 20;
export const LOG_LEVEL_INFO = 30;
export const LOG_LEVEL_WARN = 40;
export const LOG_LEVEL_ERROR = 50;
export const LOG_LEVEL_NONE = 90;

export interface LoggerImpl {
    trace(...args: any[]): void;
    debug(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
}

class ConsoleLoggerImpl implements LoggerImpl {
    trace(...args: any[]): void {
        console.log(...args);
    }

    debug(...args: any[]): void {
        console.log(...args);
    }

    info(...args: any[]): void {
        console.log(...args);
    }

    warn(...args: any[]): void {
        console.log(...args);
    }

    error(...args: any[]): void {
        console.log(...args);
    }
}

let loggerImpl: LoggerImpl = new ConsoleLoggerImpl();
let logLevel = LOG_LEVEL_INFO;

export function setLoggerImpl(impl: LoggerImpl): void {
    loggerImpl = impl;
}

export function setLogLevel(level: number): void {
    logLevel = level;
}

export function traceLog(...args: any[]): void {
    if (logLevel <= LOG_LEVEL_TRACE) {
        loggerImpl.trace(...args);
    }
}

export function debugLog(...args: any[]): void {
    if (logLevel <= LOG_LEVEL_DEBUG) {
        loggerImpl.debug(...args);
    }
}

export function infoLog(...args: any[]): void {
    if (logLevel <= LOG_LEVEL_INFO) {
        loggerImpl.info(...args);
    }
}

export function warnLog(...args: any[]): void {
    if (logLevel <= LOG_LEVEL_WARN) {
        loggerImpl.warn(...args);
    }
}

export function errorLog(...args: any[]): void {
    if (logLevel <= LOG_LEVEL_ERROR) {
        loggerImpl.error(...args);
    }
}
