import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
    title: string
    content: string
    imageUrl: string
    author: mongoose.Types.ObjectId
}

const BlogSchema: Schema = new Schema<IBlog>(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,   
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
        author: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {timestamps: true}
);

export const Blog = mongoose.model<IBlog>('Blog', BlogSchema);
export default Blog;