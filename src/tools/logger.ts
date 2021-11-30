const NAMESPACE = 'Logger-Tool';

export class Logger{

    getTimeStamp = (): string => {
        return new Date().toISOString();
    };

    info = (namespace: string, message: string, object?: any) => {
        if (object) {
            console.info(`[${this.getTimeStamp()}] [INFO] [${namespace}] ${message}`, object);
        } else {
            console.info(`[${this.getTimeStamp()}] [INFO] [${namespace}] ${message}`);
        }
    };
    warn = (namespace: string, message: string, object?: any) => {
        if (object) {
            console.warn(`[${this.getTimeStamp()}] [WARN] [${namespace}] ${message}`, object);
        } else {
            console.warn(`[${this.getTimeStamp()}] [WARN] [${namespace}] ${message}`);
        }
    };
    
    error = (namespace: string, message: string, object?: any) => {
        if (object) {
            console.error(`[${this.getTimeStamp()}] [ERROR] [${namespace}] ${message}`, object);
        } else {
            console.error(`[${this.getTimeStamp()}] [ERROR] [${namespace}] ${message}`);
        }
    };
    
    debug = (namespace: string, message: string, object?: any) => {
        if (object) {
            console.debug(`[${this.getTimeStamp()}] [DEBUG] [${namespace}] ${message}`, object);
        } else {
            console.debug(`[${this.getTimeStamp()}] [DEBUG] [${namespace}] ${message}`);
        }
    };
}