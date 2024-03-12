import { Router } from "express"
import { register, getUser, login } from "../controllers/auth.js"
import { checkAuth } from "../utils/checlAuth.js";

const router = new Router();

router.post('/register', register);

router.post('/login', login);

router.get('/main', checkAuth, getUser);

export default router