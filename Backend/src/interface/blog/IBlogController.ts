import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../../middleware/auth";

export interface IBlogController {
    createBlog(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    getAllBlogs(req: Request, res: Response, next: NextFunction): Promise<void>;
    getBlogsByUserId(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    getBlogById(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateBlog(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    deleteBlog(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
}