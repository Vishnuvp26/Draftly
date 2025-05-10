import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../constants/statusConstant";
import { Messages } from "../constants/MessageConstants";
import Blog from "../model/blogModel";

export const createBlog = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { title, content} = req.body;
        const { userId } = req.params;

        if (!title || !content) {
            res.status(HttpStatus.BAD_REQUEST).json({ message: Messages.ALL_FEILDs_REQUIRED });
            return;
        }
    
        if (!req.file) {
            res.status(HttpStatus.BAD_REQUEST).json({ message: Messages.NO_FILE });
            return;
        }

        const imageUrl = req.file.path;

        const newBlog = new Blog({
            title,
            content,
            imageUrl,
            author: userId
        });

        await newBlog.save();

        res.status(HttpStatus.CREATED).json({
            message: Messages.BLOG_CREATED,
            blog: newBlog
        });

    } catch (error) {
        next(error)
    }
};

export const getAllBlogs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { page = 1, search = "" } = req.query;

        const limit = 3;
        const skip = (Number(page) - 1) * limit;

        const query = search
            ? { title: { $regex: new RegExp(search as string, 'i') } }
            : {};

        const [blogs, total] = await Promise.all([
            Blog.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate("author", "name")
                .lean(),
            Blog.countDocuments(query),
        ]);

        res.status(HttpStatus.OK).json({
            blogs,
            totalPages: Math.ceil(total / limit),
            currentPage: Number(page),
            total,
        });
    } catch (error) {
        next(error);
    }
};

export const getBlogsByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { userId } = req.params;
        const { page = 1, search = "" } = req.query;

        const limit = 3;
        const skip = (Number(page) - 1) * limit;

        const query = {
            author: userId,
            ...(search && {
                title: { $regex: new RegExp(search as string, "i") }
            }),
        };

        const [blogs, total] = await Promise.all([
            Blog.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate("author", "name"),
            Blog.countDocuments(query),
        ]);

        res.status(HttpStatus.OK).json({
            blogs,
            totalPages: Math.ceil(total / limit),
            currentPage: Number(page),
            total,
        });
    } catch (error) {
        next(error);
    }
};

export const getBlogById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;

        const blog = await Blog.findById(id)
            .populate("author", "name")
            .lean();

        if (!blog) {
            res.status(HttpStatus.NOT_FOUND).json({ message: Messages.BLOG_NOT_FOUND });
            return;
        }

        res.status(HttpStatus.OK).json({
            blog
        });
    } catch (error) {
        next(error);
    }
};

export const updateBlog = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const imageUrl = req.file?.path;

        const blog = await Blog.findById(id);

        if (!blog) {
            res.status(HttpStatus.NOT_FOUND).json({ message: Messages.BLOG_NOT_FOUND });
            return;
        }

        if (blog.author.toString() !== req.params.userId) {
            res.status(HttpStatus.FORBIDDEN).json({ message: Messages.NOT_AUTHORIZED });
            return;
        }

        const updateData: any = {
            title,
            content,
            ...(imageUrl && { imageUrl })
        };

        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        ).populate("author", "name");

        res.status(HttpStatus.OK).json({
            message: Messages.BLOG_UPDATED,
            blog: updatedBlog
        });
    } catch (error) {
        next(error);
    }
};

export const deleteBlog = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;

        const blog = await Blog.findById(id);

        if (!blog) {
            res.status(HttpStatus.NOT_FOUND).json({ message: Messages.BLOG_NOT_FOUND });
            return;
        }

        if (blog.author.toString() !== req.params.userId) {
            res.status(HttpStatus.FORBIDDEN).json({ message: Messages.NOT_AUTHORIZED });
            return;
        }

        await Blog.findByIdAndDelete(id);

        res.status(HttpStatus.OK).json({
            message: Messages.BLOG_DELETED
        });
    } catch (error) {
        next(error);
    }
};