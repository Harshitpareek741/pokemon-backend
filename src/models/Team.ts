import mongoose, { Document, Schema, Model } from 'mongoose';
import { ITeam } from './types/ITeam.js';

const teamSchema = new Schema<ITeam>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    avatar : {
        type : String , 
        required: true , 
    },
    description: {
      type: String,
      trim: true,
    },
    admin: 
      {
        type: String,
       required: true,
      },
    status:
    {
      type: Number,
      required : true ,
      default: 0 
    }
  },
  {
    timestamps: true, 
  }
);

const Team: Model<ITeam> = mongoose.model<ITeam>('Team', teamSchema);

export default Team;
