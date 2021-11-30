"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const NAMESPACE = 'Logger-Tool';
class Logger {
    constructor() {
        this.getTimeStamp = () => {
            return new Date().toISOString();
        };
        this.info = (namespace, message, object) => {
            if (object) {
                console.info(`[${this.getTimeStamp()}] [INFO] [${namespace}] ${message}`, object);
            }
            else {
                console.info(`[${this.getTimeStamp()}] [INFO] [${namespace}] ${message}`);
            }
        };
        this.warn = (namespace, message, object) => {
            if (object) {
                console.warn(`[${this.getTimeStamp()}] [WARN] [${namespace}] ${message}`, object);
            }
            else {
                console.warn(`[${this.getTimeStamp()}] [WARN] [${namespace}] ${message}`);
            }
        };
        this.error = (namespace, message, object) => {
            if (object) {
                console.error(`[${this.getTimeStamp()}] [ERROR] [${namespace}] ${message}`, object);
            }
            else {
                console.error(`[${this.getTimeStamp()}] [ERROR] [${namespace}] ${message}`);
            }
        };
        this.debug = (namespace, message, object) => {
            if (object) {
                console.debug(`[${this.getTimeStamp()}] [DEBUG] [${namespace}] ${message}`, object);
            }
            else {
                console.debug(`[${this.getTimeStamp()}] [DEBUG] [${namespace}] ${message}`);
            }
        };
    }
}
exports.Logger = Logger;
