import { Router } from "express";
import { createBlog, deleteBlog, getAllBlogs, getBlogById, getBlogsByUserId, updateBlog } from "../controller/blogController";
import upload from "../config/multer.config";

const router = Router();

router.post('/create-blog/:userId', upload.single('image'), createBlog);
router.get("/blogs", getAllBlogs);
router.get("/blogs/user/:userId", getBlogsByUserId);
router.get("/blog/:id", getBlogById);
router.put("/blog/:id/user/:userId", upload.single("image"), updateBlog);
router.delete("/blog/:id/user/:userId", deleteBlog);

export default router;