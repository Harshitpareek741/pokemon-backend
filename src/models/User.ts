// src/models/User.ts
import { Schema, model } from 'mongoose';
import { IUser } from './types/IUser.js';

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      enum: ['User', 'Admin', 'Artist'],
      default: 'User',
    },
  }
);

const User = model<IUser>('User', UserSchema);

export default User;
