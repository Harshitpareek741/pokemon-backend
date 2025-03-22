import { Schema, model, Document, Types } from "mongoose";
import { IPokemon } from "./types/IPokemon";

const PokemonSchema = new Schema<IPokemon>({
  id: { type: Number, required: true, unique: true, index: true },
  name: { type: String, required: true, unique: true, index: true },
  url : {type : String ,required: true, unique: true}
});

export const Pokemon = model<IPokemon>("Pokemon", PokemonSchema);
