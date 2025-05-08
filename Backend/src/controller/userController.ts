import { NextFunction, Request, Response } from "express";
import User from "../model/userModel";
import { HttpStatus } from "../constants/statusConstant";
import { Messages } from "../constants/MessageConstants";
import { comparePassword, hashPassword } from "../utils/password";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        console.log('Received registration request:', req.body);
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(HttpStatus.BAD_REQUEST).json({ message: Messages.USER_EXIST });
            return;
        }

        const hashedPassword = await hashPassword(password);

        const user = new User({
            name,
            email,
            password: hashedPassword,
        });

        await user.save();
        res.status(HttpStatus.OK).json({ message: Messages.SIGNUP_SUCCESS })
    } catch (error) {
        next(error)
    }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            res.status(HttpStatus.BAD_REQUEST).json({ message: Messages.USER_NOT_FOUND });
            return;
        }

        const validPassword = await comparePassword(password, user.password);
        if (!validPassword) {
            res.status(HttpStatus.BAD_REQUEST).json({ message: Messages.INVALID_CREDENTIALS });
            return
        }

        const accessToken = generateAccessToken(user.id.toString());
        const refreshToken = generateRefreshToken(user.id.toString());

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(HttpStatus.OK).json({
            message: Messages.LOGIN_SUCCESS,
            user: user,
            accessToken,
        });
    } catch (error) {
        next(error)
    }
};