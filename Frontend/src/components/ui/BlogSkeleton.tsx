import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "./skeleton";

const BlogSkeleton = () => {
    return (
        <div>
            <div className="grid gap-6">
                {Array(5)
                    .fill(0)
                    .map((_, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-1/2 mt-2" />
                            </CardHeader>
                            <CardContent>
                                <div className="flex gap-4">
                                    <Skeleton className="w-32 h-32 rounded" />
                                    <Skeleton className="h-20 w-full mt-2" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
            </div>
        </div>
    )
};

export default BlogSkeleton