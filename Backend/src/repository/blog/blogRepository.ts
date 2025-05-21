import { IBlogRepository } from "../../interface/blog/IBlogRepository";
import Blog, { IBlog } from "../../model/blogModel";
import { BaseRepository } from "../base/baseRepository";

export class BlogRepository extends BaseRepository<IBlog> implements IBlogRepository {
    constructor() {
        super(Blog)
    }

    async create(blog: Partial<IBlog>): Promise<IBlog> {
        const newBlog = new Blog(blog);
        return await this.model.create(newBlog)
    };

    async findById(id: string): Promise<IBlog | null> {
        return await this.model.findById(id)
    };

    async findAll(query?: any, skip?: number, limit?: number): Promise<IBlog[]> {
        return await this.model
            .find(query)
            .sort({ createdAt: -1 })
            .skip(skip || 0)
            .limit(limit || 0)
            .populate("author", "name");
    };

    async countDocuments(query: any): Promise<number> {
        return await this.model.countDocuments(query);
    };

    async update(id: string, data: Partial<IBlog>): Promise<IBlog | null> {
        return await this.model
            .findByIdAndUpdate(id, data, { new: true })
            .populate("author", "name");
    };

    async delete(id: string): Promise<void> {
        await this.model.findByIdAndDelete(id);
    };
}