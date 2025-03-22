import { Document } from 'mongoose';

export type UserRole = 'User' | 'Admin' ;

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: UserRole;
  avatar? : string ; 
}
