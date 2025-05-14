import { Router } from "express";
import { createBlog, deleteBlog, getAllBlogs, getBlogById, getBlogsByUserId, updateBlog } from "../controller/blogController";
import upload from "../config/multer.config";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.post(
    "/create-blog/:userId",
    authenticateToken,
    upload.single('image'),
    createBlog
);

router.get(
    "/blogs",
    authenticateToken,
    getAllBlogs
);

router.get(
    "/blogs/user/:userId",
    authenticateToken,
    getBlogsByUserId
);

router.get(
    "/blog/:id",
    authenticateToken,
    getBlogById
);

router.put(
    "/blog/:id/user/:userId",
    authenticateToken,
    upload.single("image"),
    updateBlog
);

router.delete(
    "/blog/:id",
    authenticateToken,
    deleteBlog
);

export default router;