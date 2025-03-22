var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Pokemon } from "../../models/Pokemon.js";
export function getPokemonController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name } = req.query;
            let pokemons;
            if (name && typeof name === "string") {
                // Filter by name using a case-insensitive regex.
                pokemons = yield Pokemon.find({ name: { $regex: name, $options: "i" } });
            }
            else {
                // Return all Pokémon if no name is provided.
                pokemons = yield Pokemon.find({});
            }
            res.status(200).json(pokemons);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error retrieving Pokémon" });
        }
    });
}
