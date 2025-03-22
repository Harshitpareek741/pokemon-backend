import { Schema, model } from "mongoose";
const AbilitySchema = new Schema({
    id: { type: Number, required: true, unique: true, index: true },
    name: { type: String, required: true, unique: true, index: true },
    isMainSeries: { type: Boolean, required: true },
    effect: { type: String },
    shortEffect: { type: String }
});
export const Ability = model("Ability", AbilitySchema);
