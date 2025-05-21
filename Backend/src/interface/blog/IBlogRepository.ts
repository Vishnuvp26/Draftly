import { IBlog } from "../../model/blogModel";

export interface IBlogRepository {
    create(blog: IBlog): Promise<IBlog>;
    findById(id: string): Promise<IBlog | null>;
    findAll(query: any, skip: number, limit: number): Promise<IBlog[]>;
    countDocuments(query: any): Promise<number>;
    update(id: string, data: Partial<IBlog>): Promise<IBlog | null>;
    delete(id: string): Promise<void>;
};