import mongoose, { Schema } from "mongoose";
import { ITeamMembers } from "./types/ITeamMembers.js";


const teamMembers = new Schema<ITeamMembers>(
  {
    TeamId: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

const TeamMembers = mongoose.model<ITeamMembers>("TeamMembers", teamMembers);

export default TeamMembers;
