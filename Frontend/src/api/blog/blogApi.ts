import { axiosInstance } from "../axios/axios";

interface CreateBlogPayload {
  title: string;
  content: string;
  image: File;
  userId: string;
}

export const createBlog = async ({ title, content, image, userId }: CreateBlogPayload) => {
    try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("image", image);

        const response = await axiosInstance.post(`/api/create-blog/${userId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error: any) {
        throw error.response?.data || "Failed to create blog";
    }
};

export const getBlogs = async (page: number = 1, search: string = "") => {
    try {
        const response = await axiosInstance.get(`/api/blogs?page=${page}&search=${search}`);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || "Failed to get blogs"
    }
};

export const getMyBlogs = async (userId: string, page: number = 1, search: string = "") => {
    try {
        const response = await axiosInstance.get(`/api/blogs/user/${userId}?page=${page}&search=${search}`);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || "Failed to get user's blogs";
    }
};

export const getBlogById = async (id: string) => {
    try {
        const response = await axiosInstance.get(`/api/blog/${id}`);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || "Failed to get blog details";
    }
};