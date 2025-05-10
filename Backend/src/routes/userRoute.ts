import { Router } from "express";
import { validateRegister } from "../middleware/validation";
import { login, register } from "../controller/userController";
import { refreshToken } from "../controller/authController";

const router = Router();

router.post('/register', validateRegister, register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);

export default router;