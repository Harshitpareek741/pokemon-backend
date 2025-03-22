import mongoose, { Schema } from "mongoose";
const EventRegistrationSchema = new Schema({
    eventId: { type: String, required: true },
    userId: { type: String, required: true },
}, { timestamps: true });
const EventRegistrations = mongoose.model("Ticket", EventRegistrationSchema);
export default EventRegistrations;
