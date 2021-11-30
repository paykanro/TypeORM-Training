import { ErrorType, ErrorResponse } from './types';
const NAMESPACE = 'CustomError-Tool';

export class CustomError extends Error {
  private httpStatusCode: number;
  private errorType: ErrorType;
  private errorRaw: any;

  constructor(httpStatusCode: number, errorType: ErrorType, message: string, errorRaw: any = null) {
    super(message);
    this.name = this.constructor.name;
    this.httpStatusCode = httpStatusCode;
    this.errorType = errorType;
    this.errorRaw = errorRaw;
  }

  get HttpStatusCode() {return this.httpStatusCode;}

  get JSON(): ErrorResponse {
    return {
      errorType: this.errorType,
      errorMessage: this.message,
      errorRaw: this.errorRaw
    };
  }
}
