import { IBlog } from "../../model/blogModel";

export interface IBlogService {
    createBlog(title: string, content: string, imageUrl: string, userId: string): Promise<IBlog>;
    getAllBlogs(page: number, search: string, limit: number): Promise<{ blogs: IBlog[], totalPages: number, currentPage: number, total: number }>;
    getBlogsByUserId(userId: string, page: number, search: string, limit: number): Promise<{ blogs: IBlog[], totalPages: number, currentPage: number, total: number }>;
    getBlogById(id: string): Promise<IBlog>;
    updateBlog(id: string, userId: string, data: { title?: string, content?: string, imageUrl?: string }): Promise<IBlog>;
    deleteBlog(id: string, userId: string): Promise<void>;
};