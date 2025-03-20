import mongoose, { Schema } from "mongoose";
import { IEventRegistrations } from "./types/IEventRegistration";


const EventRegistrationSchema = new Schema<IEventRegistrations>(
  {
    eventId: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

const EventRegistrations = mongoose.model<IEventRegistrations>("Ticket", EventRegistrationSchema);

export default EventRegistrations;
