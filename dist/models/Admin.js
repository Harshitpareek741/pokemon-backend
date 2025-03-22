// src/models/Admin.ts
import mongoose, { Schema } from 'mongoose';
const AdminSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'Admin' },
    //additional
}, { timestamps: true });
const Admin = mongoose.model('Admin', AdminSchema);
export default Admin;
