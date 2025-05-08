import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBlogs } from "@/api/blog/blogApi";
import type { BlogType } from "@/types/types";
import BlogSkeleton from "@/components/ui/BlogSkeleton";
import PaginationControls from "../blog/Pagination";

const Home = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState<BlogType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchBlogs = async (page: number, searchTerm: string) => {
        try {
            setLoading(true);
            const response = await getBlogs(page, searchTerm);
            setBlogs(response.blogs);
            setTotalPages(response.totalPages);
            setCurrentPage(response.currentPage);
        } catch (error) {
            console.error("Failed to fetch blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    console.log('FETCHED BLOGS ON PAGE', blogs);

    useEffect(() => {
        fetchBlogs(currentPage, search);
    }, [currentPage, search]);

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
                            placeholder="Search blogs..."
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
                    <div className="grid gap-6 mb-4">
                        {blogs.map((blog) => (
                            <Card
                                key={blog._id}
                                onClick={() => navigate(`/auth/blog/${blog._id}`)}
                                className="bg-gray-200 dark:bg-neutral-900 dark:hover:border-gray-600 hover:border-gray-400"
                            >
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
                                : "No blogs have been created yet"
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
        </div>
    );
};

export default Home;