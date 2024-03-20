import { Router } from "express"
import { register, getUser, login } from "../controllers/auth.js"
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router();

router.post('/register', register);

router.post('/login', login);

router.get('/user', checkAuth, getUser);

export default router