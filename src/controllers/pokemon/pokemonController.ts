import { Request, Response } from "express";
import { Pokemon } from "../../models/Pokemon.js";

export async function getPokemonController(req: Request, res: Response) {
  try {
    const { name } = req.query;
    let pokemons;
    
    if (name && typeof name === "string") {
      // Filter by name using a case-insensitive regex.
      pokemons = await Pokemon.find({ name: { $regex: name, $options: "i" } });
    } else {
      // Return all Pokémon if no name is provided.
      pokemons = await Pokemon.find({});
    }
    
    res.status(200).json(pokemons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving Pokémon" });
  }
}
