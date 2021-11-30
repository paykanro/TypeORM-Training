import { Request, Response, NextFunction } from 'express';

import { CustomError } from '../tools';

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  return res.status(err.HttpStatusCode).json({ message:err.JSON.errorMessage, data:err.JSON});
};
