import { Schema, model } from "mongoose";
const ContactFormSchema = new Schema({
    userId: { type: String, required: true },
    artistId: { type: String, required: true },
    name: { type: String },
    email: { type: String, required: true },
    phone: { type: String },
    subject: { type: String, required: true },
    message: { type: String, required: true },
}, { timestamps: true });
// 3. Export the model
const ContactForm = model("ContactForm", ContactFormSchema);
export default ContactForm;
