import type { CreateBlogPayload, UpdateBlogPayload } from "@/types/types";
import Axios from "../axios/axios";

export const createBlog = async ({ title, content, image, userId }: CreateBlogPayload) => {
    try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("image", image);

        const response = await Axios.post(`/api/create-blog/${userId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error: any) {
        throw new Error('Only image files are allowed');
    }
};

export const getBlogs = async (page: number = 1, search: string = "") => {
    try {
        const response = await Axios.get(`/api/blogs?page=${page}&search=${search}`);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || "Failed to get blogs"
    }
};

export const getMyBlogs = async (userId: string, page: number = 1, search: string = "") => {
    try {
        const response = await Axios.get(`/api/blogs/user/${userId}?page=${page}&search=${search}`);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || "Failed to get user's blogs";
    }
};

export const getBlogById = async (id: string) => {
    try {
        const response = await Axios.get(`/api/blog/${id}`);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || "Failed to get blog details";
    }
};

export const updateBlog = async ({ id, title, content, image, userId }: UpdateBlogPayload) => {
    try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (image) {
            formData.append("image", image);
        }

        const response = await Axios.put(
            `/api/blog/${id}/user/${userId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data;
    } catch (error: any) {
        throw error.response?.data || "Failed to update blog";
    }
};

export const deleteBlog = async (id: string) => {
    try {
        const response = await Axios.delete(`/api/blog/${id}`);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || "Failed to delete blog";
    }
};