import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Camera, Loader2, Trash } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getBlogById, updateBlog } from "@/api/blog/blogApi";
import { toast } from "sonner";
import { validateBlog } from "@/utils/validation";

const EditBlog = () => {
    const { id } = useParams();
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();
    const userId = useSelector((state: any) => state.user._id);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                if (!id) return;
                const response = await getBlogById(id);
                const blog = response.blog;
                setTitle(blog.title);
                setContent(blog.content);
                setImagePreview(blog.imageUrl);
            } catch (error) {
                console.error("Failed to fetch blog:", error);
                toast.error("Failed to fetch blog details");
                navigate("/auth/my-blogs");
            } finally {
                setFetchLoading(false);
            }
        };

        fetchBlog();
    }, [id, navigate]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleImageDelete = () => {
        setImage(null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { valid, errors: validationErrors } = validateBlog({ 
            title, 
            content,
            image: image as File || imagePreview
        });

        if (!valid) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});

        if (!userId || !id) {
            toast.error("Missing required information");
            return;
        }

        try {
            setLoading(true);
            await updateBlog({ 
                id, 
                title, 
                content, 
                image: image || undefined, 
                userId 
            });

            toast.success("Blog updated successfully", {
                action: {
                    label: "View",
                    onClick: () => navigate(`/auth/blog/${id}`),
                },
            });
            navigate("/auth/my-blogs");
        } catch (err: any) {
            console.error("Error updating blog:", err);
            toast.error(err.message || "Failed to update blog");
        } finally {
            setLoading(false);
        }
    };

    if (fetchLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-32 space-y-4 p-4">
            <h2 className="text-2xl font-bold text-center mb-6">Edit Blog</h2>
            <Input
                type="text"
                placeholder="Blog Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={250}
                className="border-gray-300 dark:border-gray-500"
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
            
            <Textarea
                placeholder="Write your blog content..."
                rows={8}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="border-gray-300 dark:border-gray-500"
            />
            {errors.content && <p className="text-sm text-red-500">{errors.content}</p>}

            <div 
                className="w-full h-60 border border-dashed border-gray-400 rounded-md flex items-center justify-center relative cursor-pointer" 
                onClick={() => fileInputRef.current?.click()}
            >
                {imagePreview ? (
                    <>
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-md"
                        />
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleImageDelete();
                            }}
                            className="absolute top-2 right-2 p-2 bg-white rounded-full opacity-70 hover:opacity-100"
                        >
                            <Trash className="w-5 h-5 text-red-500" />
                        </button>
                    </>
                ) : (
                    <div className="flex flex-col items-center text-gray-500">
                        <Camera className="w-12 h-12 mb-2" />
                        <span className="text-sm font-medium">Add Thumbnail</span>
                    </div>
                )}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                />
            </div>
            {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}

            <div className="flex justify-end space-x-2">
                <Button 
                    type="button" 
                    onClick={() => navigate('/auth/my-blogs')} 
                    variant="destructive"
                >
                    Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Updating...
                        </span>
                    ) : (
                        "Update Blog"
                    )}
                </Button>
            </div>
        </form>
    );
};

export default EditBlog;