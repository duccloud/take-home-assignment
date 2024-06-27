import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors/HttpError';

export const errorHandler = (
   err: Error,
   req: Request,
   res: Response,
   next: NextFunction
): void => {
   console.error('errorHandler are:', err);

   if (err instanceof HttpError) {
      res.status(err.statusCode).json({ message: err.message });
   } else {
      res.status(500).json({ message: 'Something went wrong' });
   }
};