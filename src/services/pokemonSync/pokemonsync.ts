// src/services/pokemonSyncService.ts
import axios from "axios";
import { Pokemon } from "../../models/Pokemon.js";

/**
 * Helper function to extract a Pokémon's id from its URL.
 * Example URL: "https://pokeapi.co/api/v2/pokemon/25/"
 */
function extractPokemonId(url: string): number | null {
  const match = url.match(/\/(\d+)\/$/);
  return match ? parseInt(match[1], 10) : null;
}

/**
 * Fetch the list of 300 Pokémon and upsert each Pokémon's name, id, and url into your database.
 */
export async function syncPokemonBatchFromResponse(): Promise<void> {
  try {
    const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=300&offset=0";
    const response = await axios.get(apiUrl);
    const data = response.data;
    const pokemonList = data.results; // Each entry is { name, url }
    
    for (const p of pokemonList) {
      const id = extractPokemonId(p.url);
      if (id === null) {
        console.warn(`Could not extract id from URL: ${p.url}`);
        continue;
      }
      
      // Upsert the Pokémon record: update if exists, or insert new.
      await Pokemon.findOneAndUpdate(
        { id },
        { id, name: p.name, url: p.url },
        { upsert: true, new: true }
      );
      console.log(`Saved Pokémon: ${p.name} (id: ${id})`);
    }
    
    console.log(`Finished syncing ${pokemonList.length} Pokémon.`);
  } catch (error) {
    console.error("Error syncing Pokémon batch:", error);
  }
}
