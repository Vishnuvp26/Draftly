import mongoose from "mongoose";
import { Messages } from "../../constants/MessageConstants";
import { HttpStatus } from "../../constants/statusConstant";
import { IBlogRepository } from "../../interface/blog/IBlogRepository";
import { IBlogService } from "../../interface/blog/IBlogService";
import { IBlog } from "../../model/blogModel";
import { createHttpError } from "../../utils/httpError";

export class BlogService implements IBlogService {
    constructor(private _blogRepo: IBlogRepository) { }

    async createBlog(title: string, content: string, imageUrl: string, userId: string): Promise<IBlog> {
        if (!title || !content || !imageUrl) {
            throw createHttpError(HttpStatus.BAD_REQUEST, Messages.ALL_FEILDs_REQUIRED);
        }

        const newBlog = await this._blogRepo.create({
            title,
            content,
            imageUrl,
            author: new mongoose.Types.ObjectId(userId)
        } as any);

        return newBlog;
    };

    async getAllBlogs(page: number, search: string, limit: number): Promise<{ blogs: IBlog[], totalPages: number, currentPage: number, total: number }> {
        const skip = (page - 1) * limit;

        const query = search
            ? { title: { $regex: new RegExp(search, 'i') } }
            : {};

        const [blogs, total] = await Promise.all([
            this._blogRepo.findAll(query, skip, limit),
            this._blogRepo.countDocuments(query)
        ]);

        return {
            blogs,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        };
    };

    async getBlogsByUserId(userId: string, page: number, search: string, limit: number): Promise<{ blogs: IBlog[], totalPages: number, currentPage: number, total: number }> {
        const skip = (page - 1) * limit;

        const query = {
            author: userId,
            ...(search && {
                title: { $regex: new RegExp(search, "i") }
            }),
        };

        const [blogs, total] = await Promise.all([
            this._blogRepo.findAll(query, skip, limit),
            this._blogRepo.countDocuments(query)
        ]);

        return {
            blogs,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        };
    };

    async getBlogById(id: string): Promise<IBlog> {
        const blog = await this._blogRepo.findById(id);
        
        if (!blog) {
            throw createHttpError(HttpStatus.NOT_FOUND, Messages.BLOG_NOT_FOUND);
        }

        return blog;
    };

    async updateBlog(id: string, userId: string, data: { title?: string, content?: string, imageUrl?: string }): Promise<IBlog> {
        const blog = await this._blogRepo.findById(id);

        if (!blog) {
            throw createHttpError(HttpStatus.NOT_FOUND, Messages.BLOG_NOT_FOUND);
        }

        if (blog.author._id.toString() !== userId) {
            throw createHttpError(HttpStatus.FORBIDDEN, Messages.NOT_AUTHORIZED);
        }

        const updatedBlog = await this._blogRepo.update(id, data);
        
        if (!updatedBlog) {
            throw createHttpError(HttpStatus.INTERNAL_SERVER_ERROR, Messages.FAILED);
        }

        return updatedBlog;
    };

    async deleteBlog(id: string, userId: string): Promise<void> {
        const blog = await this._blogRepo.findById(id);
        
        if (!blog) {
            throw createHttpError(HttpStatus.NOT_FOUND, Messages.BLOG_NOT_FOUND);
        }

        if (blog.author.toString() !== userId) {
            throw createHttpError(HttpStatus.FORBIDDEN, Messages.NOT_AUTHORIZED);
        }

        await this._blogRepo.delete(id);
    };
};