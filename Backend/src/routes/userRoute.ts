import { Router } from "express";
import User, { IUser } from "../model/userModel";
import { BaseRepository } from "../repository/base/baseRepository";
import { UserService } from "../service/user/userService";
import { UserController } from "../controller/user/userController";
import { validateRegister } from "../middleware/validation";

const router = Router();

const userRepository = new BaseRepository<IUser>(User);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post(
    '/register',
    validateRegister,
    userController.register.bind(userController)
);

router.post(
    '/login',
    userController.login.bind(userController)
);

router.post(
    '/refresh-token',
    userController.refreshAccessToken.bind(userController)
);

export default router;