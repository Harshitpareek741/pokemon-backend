import { Request, Response, NextFunction } from 'express';
import User from '../../../models/User.js';
import Admin from '../../../models/Admin.js';
import { IUser } from '../../../models/types/IUser.js';
import { IAdmin } from '../../../models/types/IAdmin.js';
import { validateFields, artistRequiredFields, userRequiredFields } from '../../../utils/validators/validator.js';

export const signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { role } = req.body;
    if (role && role === 'admin') {
      const missingArtist = validateFields(req.body, artistRequiredFields);
      if (missingArtist) {
        res.status(422).json({ error: `Please fill the required admin field: ${missingArtist}` });
        return;
      }
    
      const {
        username,
        email,
        password,
      } = req.body as IAdmin;
 
      const adminAlreadyExists = await Admin.findOne({ $or: [{ username }, { email }] });
      if (adminAlreadyExists) {
        res.status(422).json({ error: 'Username or email already exists' });
        return;
      }
      const newAdmin = await Admin.create({
        username,
        email,
        password,
        role: 'Admin',
      });
   
      (req as any).userId = newAdmin._id;
    } else {
      const missingUser = validateFields(req.body, userRequiredFields);
      if (missingUser) {
        res.status(422).json({ error: `Please fill the required field: ${missingUser}` });
        return;
      }
      const { username, email, password } = req.body as IUser;
      const userAlreadyExists = await User.findOne({ $or: [{ username }, { email }] });
      if (userAlreadyExists) {
        res.status(422).json({ error: 'Username or email already exists' });
        return;
      }
      const newUser = await User.create({
        username,
        email,
        password,
        role: 'User'
      });
      (req as any).userId = newUser._id;
    }
    next();
  } catch (error) {
    next(error);
  }
};
