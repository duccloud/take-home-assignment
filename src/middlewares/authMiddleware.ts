import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
   const authHeader = req.headers['authorization'];
   const token = authHeader && authHeader.split(' ')[1];

   if (token == null) {
      res.status(401).json({ message: 'Authentication token required' });
      return;
   }

   jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
         res.status(403).json({ message: 'Invalid token' });
         return;
      }
      req.user = user;
      next();
   });
};
