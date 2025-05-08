import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL;

// const Axios = axios.create({
//     baseURL: API_BASE_URL,
//     withCredentials: true,
//     headers: {
//         "Content-Type": "application/json",
//     },
// })

export const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});