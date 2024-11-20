export abstract class BaseException extends Error {
    status?: number;
    reason?: string;
  
    constructor(message: string) {
      super(message);
      Error.captureStackTrace(this, this.constructor);
    }
  }