import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User';
import { AuthenticatedRequest } from '../types/AuthenticatedRequest';

dotenv.config();

export const getUserBasicInfo = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
   try {
      if (!req.decodedToken) {
         res.status(400).json({ message: 'Invalid token' });
         return;
      }

      const username = req.decodedToken.username;

      // Assuming User model has a method to find by username
      const user = await User.findOne({ where: { username } });

      if (!user) {
         res.status(404).json({ message: 'User not found' });
         return;
      }

      // Return user information
      res.json({ user });
   } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Failed to fetch user information' });
   }
}
