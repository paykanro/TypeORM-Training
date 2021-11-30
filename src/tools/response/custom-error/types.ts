export type ErrorResponse = {
  errorType: ErrorType;
  errorMessage: string;
  errorRaw: any;
};
export type ErrorType = 'ُServer' |'Validation' | 'Unauthorized' | 'Undefined' | 'General';
