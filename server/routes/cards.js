import { Router } from "express";
import { getCards } from "../controllers/cards.js";

const router = new Router();

router.get('/', getCards);

export default router