import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User';
import { hashPassword, comparePasswords } from '../utils/passwordUtils';
import { UserAttributes } from '../models/interfaces';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const register = async (req: Request, res: Response): Promise<void> => {
   const { username, password } = req.body;

   try {
      // Validate input
      if (!username || !password) {
         res.status(400).json({ message: 'Username and password are required' });
         return;
      }

      const hashedPassword = await hashPassword(password);

      const newUser = await User.create({
         username,
         password: hashedPassword,
      } as UserAttributes);

      res.status(201).json({ message: 'User registered successfully', user: newUser });
   } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: 'Failed to register user' });
   }
};

export const login = async (req: Request, res: Response): Promise<void> => {
   const { username, password } = req.body;

   try {
      // Validate input
      if (!username || !password) {
         res.status(400).json({ message: 'Username and password are required' });
         return;
      }

      const user = await User.findOne({ where: { username } });

      if (!user) {
         res.status(404).json({ message: 'User not found' });
         return;
      }

      const isPasswordValid = await comparePasswords(password, user.password);

      if (!isPasswordValid) {
         res.status(401).json({ message: 'Invalid credentials' });
         return;
      }

      const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

      res.json({ token });
   } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Login failed' });
   }
};
