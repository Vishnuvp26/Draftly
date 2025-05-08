import { Router } from "express";
import { validateRegister } from "../middleware/validation";
import { login, refreshToken, register } from "../controller/userController";

const router = Router();

router.post('/register', validateRegister, register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);

export default router;