import { axiosInstance } from "../axios/axios";

export const registerUser = async (userData: { name: string; email: string; password: string;  confirmPassword: string;}) => {
    try {
        const response = await axiosInstance.post("/api/register", userData);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || "Registration failed";
    }
};

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axiosInstance.post("/api/login", { email, password });
        return response.data;
    } catch (error: any) {
        throw error.response?.data || "Login failed";
    }
};