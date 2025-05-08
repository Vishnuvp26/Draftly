import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Pencil, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMyBlogs, deleteBlog } from "@/api/blog/blogApi";
import type { BlogType } from "@/types/types";
import BlogSkeleton from "@/components/ui/BlogSkeleton";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical, Trash } from "lucide-react";
import { toast } from "sonner";
import ConfirmDialog from "./Alert";
import PaginationControls from "./Pagination";

const Blogs = () => {
    const user = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState<BlogType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState<string | null>(null);

    const fetchBlogs = async (page: number, searchTerm: string) => {
        try {
            if (!user?._id) return;
            setLoading(true);
            const response = await getMyBlogs(user._id, page, searchTerm);
            setBlogs(response.blogs);
            setTotalPages(response.totalPages);
            setCurrentPage(response.currentPage);
        } catch (error) {
            console.error("Failed to fetch blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (blogId: string) => {
        try {
            if (!user?._id) return;
            await deleteBlog(blogId, user._id);
            toast.success("Blog deleted successfully");
            fetchBlogs(currentPage, search);
            setBlogToDelete(null);
        } catch (error) {
            console.error("Failed to delete blog:", error);
            toast.error("Failed to delete blog");
        }
    };

    useEffect(() => {
        fetchBlogs(currentPage, search);
    }, [currentPage, search, user?._id]);

    const handleClearSearch = () => {
        setSearch("");
    };

    return (
        <div className="mt-20 sm:mt-32 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div className="relative w-64">
                        <Input
                            type="text"
                            placeholder="Search your blogs..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 pr-8"
                        />
                        <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                        {search && (
                            <button
                                onClick={handleClearSearch}
                                className="absolute right-2 top-2 p-1 hover:bg-gray-100 rounded-full dark:hover:bg-gray-800"
                            >
                                <X className="w-4 h-4 text-gray-500" />
                            </button>
                        )}
                    </div>

                    <Button
                        onClick={() => navigate("/auth/create-blog")}
                        className="flex items-center gap-2"
                    >
                        <Pencil className="w-3 h-3" />
                        Create
                    </Button>
                </div>

                {loading ? (
                    <BlogSkeleton />
                ) : blogs.length > 0 ? (
                    <div className="grid gap-6">
                        {blogs.map((blog) => (
                            <Card
                                key={blog._id}
                                className="bg-gray-200 dark:bg-neutral-900 relative"
                            >
                                <div className="absolute top-2 right-2">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0 hover:bg-gray-300 dark:hover:bg-gray-700"
                                            >
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/auth/blog/${blog._id}`);
                                                }}
                                                className="flex items-center gap-2"
                                            >
                                                <BookOpen className="h-4 w-4" />
                                                <span>View</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/auth/blog/edit-blog/${blog._id}`);
                                                }}
                                                className="flex items-center gap-2"
                                            >
                                                <Pencil className="h-4 w-4" />
                                                <span>Edit</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setBlogToDelete(blog._id);
                                                }}
                                                className="flex items-center gap-2 text-red-600 focus:text-red-600"
                                            >
                                                <Trash className="h-4 w-4" />
                                                <span>Delete</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <CardContent className="w-full">
                                    <div>
                                        <img
                                            src={blog.imageUrl}
                                            alt={blog.title}
                                            className="w-64 h-36 object-cover rounded"
                                        />
                                        <p className="text-gray-600 dark:text-gray-300 w-full mt-2">
                                            {blog.content.substring(0, 200)}...
                                        </p>
                                    </div>
                                </CardContent>
                                <CardHeader>
                                    <CardTitle>{blog.title}</CardTitle>
                                    <p className="text-sm text-gray-500">
                                        By {blog.author.name}
                                    </p>
                                </CardHeader>
                                
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                        <p className="text-xl font-semibold text-gray-600 dark:text-gray-400">
                            No blogs found
                        </p>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                            {search
                                ? `No results found for "${search}"`
                                : "You haven't created any blogs yet"
                            }
                        </p>
                    </div>
                )}
                {totalPages > 1 && (
                    <div className="mt-6 mb-5">
                        <PaginationControls
                            currentPage={currentPage}
                            totalPages={totalPages}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                )}
            </div>
            <ConfirmDialog
                open={!!blogToDelete}
                onCancel={() => setBlogToDelete(null)}
                onConfirm={() => blogToDelete && handleDelete(blogToDelete)}
                title="Are you absolutely sure?"
                description="This will permanently delete your blog post."
                confirmLabel="Delete"
            />
        </div>
    );
};

export default Blogs;