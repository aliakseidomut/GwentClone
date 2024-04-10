import { Router } from "express";
import { getDecks, pushCard, deleteCard } from "../controllers/decks.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router();

router.get('/', checkAuth, getDecks);
router.post('/pushCard', checkAuth, pushCard);
router.delete('/deleteCard', checkAuth, deleteCard);

export default router