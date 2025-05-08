import { HttpError } from "../utils/httpError";
import { HttpStatus } from "../constants/statusConstant";
import { Messages } from "../constants/MessageConstants";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: HttpError | Error, req: Request, res: Response, next: NextFunction) => {
    console.log("Error caught in ERROR MIDDLEWARE :", err);
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR || 500
    let message = Messages.SERVER_ERROR

    if (err instanceof HttpError) {
        statusCode = err.statusCode
        message = err.message
    } else {
        console.log('Unhandled', err);
    }
    res.status(statusCode).json({error: message})
}