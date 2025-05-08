import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { BlogType } from '@/types/types';
import { getBlogById } from '@/api/blog/blogApi';
import DetailSkeleton from '@/components/ui/DetailSkeleton';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import dayjs from "dayjs";

const Details = () => {
    const { id } = useParams();
    console.log('ID param', id);
    const [blog, setBlog] = useState<BlogType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                if (!id) return
                const response = await getBlogById(id);
                console.log('Response', response.blog);
                setBlog(response.blog);
            } catch (error) {
                console.error('Failed to fetch blog:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    return (
        <div className="mt-20 sm:mt-32 px-4">
            <div className="max-w-4xl mx-auto">
                <Breadcrumb className="mb-6">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>View Blog</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {loading ? (
                    <DetailSkeleton />
                ) : blog ? (
                    <Card className="dark:bg-neutral-950 bg-transparent border-none">
                        <CardHeader>
                            <CardTitle className="text-3xl">{blog.title}</CardTitle>
                            <p className="text-sm text-gray-500">
                                <span>Author: {blog.author.name}</span>
                                <span className="mx-2">&middot;</span>
                                <span>Posted on {dayjs(blog.createdAt).format("MMM D, YYYY [at] h:mm A")}</span>
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <img
                                src={blog.imageUrl}
                                alt={blog.title}
                                className="w-full h-48 sm:h-64 md:h-[400px] object-cover rounded"
                            />
                            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                                {blog.content}
                            </p>
                        </CardContent>
                    </Card>

                ) : (
                    <div>Blog not found</div>
                )}
            </div>
        </div>
    );
};

export default Details;