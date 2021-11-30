"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
const NAMESPACE = 'CustomError-Tool';
class CustomError extends Error {
    constructor(httpStatusCode, errorType, message, errorRaw = null) {
        super(message);
        this.name = this.constructor.name;
        this.httpStatusCode = httpStatusCode;
        this.errorType = errorType;
        this.errorRaw = errorRaw;
    }
    get HttpStatusCode() { return this.httpStatusCode; }
    get JSON() {
        return {
            errorType: this.errorType,
            errorMessage: this.message,
            errorRaw: this.errorRaw
        };
    }
}
exports.CustomError = CustomError;
