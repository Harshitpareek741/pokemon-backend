// src/models/Admin.ts
import mongoose, { Schema, Model } from 'mongoose';
import { IAdmin } from './types/IAdmin.js';

const AdminSchema: Schema<IAdmin> = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'Admin' },
    //additional
  },
  { timestamps: true }
);

const Admin: Model<IAdmin> = mongoose.model<IAdmin>('Admin', AdminSchema);
export default Admin;
