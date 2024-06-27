import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User';
import { hashPassword, comparePasswords } from '../utils/passwordUtils';
import { sendResponse } from '../utils/responseUtils';
import { UserAttributes } from '../models/interfaces';
import { BadRequestError, DataError, ResourceNotFoundError, InvalidTokenError } from '../errors/httpErrorHandlers'
import { HTTP_STATUS } from '../constant/httpStatusCodes';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWWT_TOKEN_EXPIRE_TIME = process.env.JWWT_TOKEN_EXPIRE_TIME as string;

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   const { username, password } = req.body;

   try {
      if (!username || !password) {
         next(new BadRequestError('Username and password are required'));
         return;
      }

      const hashedPassword = await hashPassword(password);

      const newUser = await User.create({
         username,
         password: hashedPassword,
      } as UserAttributes);

      sendResponse(res, HTTP_STATUS.CREATED, 'User registered successfully', { user: newUser });

   } catch (error) {
      next(error);
   }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   const { username, password } = req.body;

   try {
      if (!username || !password) {
         next(new BadRequestError('Username and password are required'));
         return;
      }

      const user = await User.findOne({ where: { username } });

      if (!user) {
         next(new ResourceNotFoundError('User not found'));
         return;
      }

      const isPasswordValid = await comparePasswords(password, user.password);

      if (!isPasswordValid) {
         next(new BadRequestError('Username or password is wrong'));
         return;
      }

      const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: JWWT_TOKEN_EXPIRE_TIME });

      res.json({ token });
   } catch (error) {
      next(error);
   }
};
