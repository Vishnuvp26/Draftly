import { Router } from "express";
import { validateRegister } from "../middleware/validation";
import { login, register } from "../controller/userController";

const router = Router();

router.post('/register', validateRegister, register);
router.post('/login', login)

export default router;