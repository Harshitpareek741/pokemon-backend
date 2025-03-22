import { Schema, model } from "mongoose";
const PokemonSchema = new Schema({
    id: { type: Number, required: true, unique: true, index: true },
    name: { type: String, required: true, unique: true, index: true },
    url: { type: String, required: true, unique: true }
});
export const Pokemon = model("Pokemon", PokemonSchema);
