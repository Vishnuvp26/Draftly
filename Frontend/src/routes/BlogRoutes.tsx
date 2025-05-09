import ProtectedRoutes from "@/components/protected/ProtectedRoute";
import EditBlog from "@/components/user/blog/EditBlog";
import CreateBlogForm from "@/components/user/blog/Form";
import DetailPage from "@/pages/user/DetailPage";
import HomePage from "@/pages/user/HomePage";
import MyBlogs from "@/pages/user/MyBlogs";
import { Routes, Route } from "react-router-dom";

const BlogRoutes = () => {
    return (
        <Routes>
            <Route
                path="home"
                element={
                    <ProtectedRoutes>
                        <HomePage />
                    </ProtectedRoutes>
                }
            />
            <Route
                path="create-blog"
                element={
                    <ProtectedRoutes>
                        <CreateBlogForm />
                    </ProtectedRoutes>
                }
            />
            <Route
                path="my-blogs"
                element={
                    <ProtectedRoutes>
                        <MyBlogs />
                    </ProtectedRoutes>
                }
            />
            <Route
                path="blog/:id"
                element={
                    <ProtectedRoutes>
                        <DetailPage />
                    </ProtectedRoutes>
                }
            />
            <Route
                path="blog/edit-blog/:id"
                element={
                    <ProtectedRoutes>
                        <EditBlog />
                    </ProtectedRoutes>
                }
            />
        </Routes>
    );
};

export default BlogRoutes;