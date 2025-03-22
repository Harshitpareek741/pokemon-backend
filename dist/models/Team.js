import mongoose, { Schema } from 'mongoose';
const teamSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        trim: true,
    },
    admin: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true,
});
const Team = mongoose.model('Team', teamSchema);
export default Team;
