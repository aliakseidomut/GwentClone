import { Router } from "express";
import { connectUser, deleteRoom, getRoom } from "../controllers/rooms.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router();

router.get('/', checkAuth, getRoom);
router.post('/connectUser', checkAuth, connectUser);
router.delete('/deleteRoom', checkAuth, deleteRoom);

export default router