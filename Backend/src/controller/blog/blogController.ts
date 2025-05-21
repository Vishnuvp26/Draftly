import { Messages } from "../../constants/MessageConstants";
import { HttpStatus } from "../../constants/statusConstant";
import { IBlogController } from "../../interface/blog/IBlogController";
import { IBlogService } from "../../interface/blog/IBlogService";
import { AuthRequest } from "../../middleware/auth";
import { NextFunction, Request, Response } from "express";

export class BlogController implements IBlogController {
    constructor(private _blogService: IBlogService) {}

    async createBlog(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const { title, content } = req.body;
            const userId = req.user?.id;
            
            if (!req.file) {
                res.status(HttpStatus.BAD_REQUEST).json({ message: Messages.NO_FILE });
                return;
            }

            const imageUrl = req.file.path;

            const blog = await this._blogService.createBlog(title, content, imageUrl, userId!);

            res.status(HttpStatus.CREATED).json({
                message: Messages.BLOG_CREATED,
                blog
            });
        } catch (error) {
            next(error);
        }
    };

    async getAllBlogs(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const page = Number(req.query.page) || 1;
            const search = req.query.search as string || "";
            const limit = 3;

            const result = await this._blogService.getAllBlogs(page, search, limit);

            res.status(HttpStatus.OK).json(result);
        } catch (error) {
            next(error);
        }
    };

    async getBlogsByUserId(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user?.id!;
            const page = Number(req.query.page) || 1;
            const search = req.query.search as string || "";
            const limit = 3;

            const result = await this._blogService.getBlogsByUserId(userId, page, search, limit);

            res.status(HttpStatus.OK).json(result);
        } catch (error) {
            next(error);
        }
    };

    async getBlogById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const blog = await this._blogService.getBlogById(id);

            res.status(HttpStatus.OK).json({ blog });
        } catch (error) {
            next(error);
        }
    };

    async updateBlog(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const { title, content } = req.body;
            const userId = req.user?.id!;
            
            const updateData: { title?: string; content?: string; imageUrl?: string } = {
                title,
                content
            };

            if (req.file) {
                updateData.imageUrl = req.file.path;
            }

            const updatedBlog = await this._blogService.updateBlog(id, userId, updateData);

            res.status(HttpStatus.OK).json({
                message: Messages.BLOG_UPDATED,
                blog: updatedBlog
            });
        } catch (error) {
            next(error);
        }
    };

    async deleteBlog(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const userId = req.user?.id!;

            await this._blogService.deleteBlog(id, userId);

            res.status(HttpStatus.OK).json({
                message: Messages.BLOG_DELETED
            });
        } catch (error) {
            next(error);
        }
    };
};