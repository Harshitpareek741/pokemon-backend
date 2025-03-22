import mongoose from "mongoose";

export interface ITeam extends Document {
    name: string;
    description?: string;
    avatar?: string ; 
    admin: string; // Array of User IDs, for example
    status : number ; 
}