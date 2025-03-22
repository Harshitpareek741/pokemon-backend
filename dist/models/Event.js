import mongoose, { Schema } from 'mongoose';
const EventSchema = new Schema({
    image: { type: String, required: true },
    image1: { type: String },
    image2: { type: String },
    title: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    city: { type: String, required: true },
    time: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    capacity: { type: Number, required: true },
    genere: { type: String, required: true },
    fees: { type: String, required: true },
}, { timestamps: true });
const Event = mongoose.model('Event', EventSchema);
export default Event;
