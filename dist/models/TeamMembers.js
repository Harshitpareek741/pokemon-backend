import mongoose, { Schema } from "mongoose";
const teamMembers = new Schema({
    TeamId: { type: String, required: true },
    userId: { type: String, required: true },
}, { timestamps: true });
const TeamMembers = mongoose.model("TeamMembers", teamMembers);
export default TeamMembers;
