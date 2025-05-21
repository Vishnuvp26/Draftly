import { Request, Response, NextFunction } from "express";

export interface IUserController {
    register(req: Request, res: Response, next: NextFunction): Promise<void>;
    login(req: Request, res: Response, next: NextFunction): Promise<void>;
    refreshAccessToken(req: Request, res: Response, next: NextFunction): Promise<void>;
};