import { Types } from "mongoose";

export interface IPokemon extends Document {
  id: number;
  name: string;
  url : string;
}
