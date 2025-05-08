import { Request, Response, NextFunction } from "express";
import { createHttpError } from "../utils/httpError";
import { Messages } from "../constants/MessageConstants";
import { HttpStatus } from "../constants/statusConstant";
import jwt from "jsonwebtoken";
import { env } from "../config/env.config";
import User from "../model/userModel";

interface AuthRequest extends Request {
    user?: {
        id: string;
    };
}

export async function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return next(createHttpError(HttpStatus.UNAUTHORIZED, Messages.TOKEN_REQUIRED));
    }

    try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string };

        const user = await User.findById(decoded.id);
        if (!user) {
            return next(createHttpError(HttpStatus.UNAUTHORIZED, Messages.USER_NOT_FOUND));
        }
        req.user = decoded;
        next();
    } catch (error) {
        return next(createHttpError(HttpStatus.UNAUTHORIZED, Messages.INVALID_TOKEN));
    }
}