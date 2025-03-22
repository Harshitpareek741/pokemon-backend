import { Router } from "express";
import { getPokemonController } from "../../controllers/pokemon/pokemonController.js";

const router = Router();


router.get("/", getPokemonController);

export default router;
