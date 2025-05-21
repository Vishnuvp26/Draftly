import { Router } from "express";
import upload from "../config/multer.config";
import { authenticateToken } from "../middleware/auth";

import { BlogController } from "../controller/blog/blogController";
import { BlogRepository } from "../repository/blog/blogRepository";
import { BlogService } from "../service/blog/blogService";

const router = Router();

const blogRepository = new BlogRepository();
const blogService = new BlogService(blogRepository);
const blogController = new BlogController(blogService)

router.post(
    "/create-blog/:userId",
    authenticateToken,
    upload.single('image'),
    blogController.createBlog.bind(blogController)
);

router.get(
    "/blogs",
    authenticateToken,
    blogController.getAllBlogs.bind(blogController)
);

router.get(
    "/blogs/user/:userId",
    authenticateToken,
    blogController.getBlogsByUserId.bind(blogController)
);

router.get(
    "/blog/:id",
    authenticateToken,
    blogController.getBlogById.bind(blogController)
);

router.put(
    "/blog/:id/user/:userId",
    authenticateToken,
    upload.single("image"),
    blogController.updateBlog.bind(blogController)
);

router.delete(
    "/blog/:id",
    authenticateToken,
    blogController.deleteBlog.bind(blogController)
);

export default router;