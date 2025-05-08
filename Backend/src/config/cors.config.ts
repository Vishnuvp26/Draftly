import { CorsOptions } from "cors";
import { env } from "./env.config";

const corsOption: CorsOptions = {
    // origin: env.CLIENT_URL,
    origin: "https://draftly-blogs.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};

export default corsOption;