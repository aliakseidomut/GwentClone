import { Router } from "express"
import { register, getUser, login } from "../controllers/auth.js"

const router = new Router();

router.post('/register', register);

router.post('/login', login);

router.get('/main', getUser);

export default router