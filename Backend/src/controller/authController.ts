import { NextFunction, Request, Response } from "express";
import { generateAccessToken, verifyRefreshToken } from "../utils/jwt";
import { HttpStatus } from "../constants/statusConstant";
import { Messages } from "../constants/MessageConstants";

export const refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const refreshToken = req.cookies.refreshToken;
        
        const decoded = verifyRefreshToken(refreshToken);
        if (!decoded) {
            res.status(HttpStatus.UNAUTHORIZED).json({ message: Messages.TOKEN_REQUIRED });
            return
        }

        const accessToken = generateAccessToken(decoded.id)

        res.status(HttpStatus.OK).json({ accessToken })
    } catch (error) {
        next(error)
    }
};