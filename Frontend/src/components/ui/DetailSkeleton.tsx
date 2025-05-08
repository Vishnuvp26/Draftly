import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const DetailSkeleton = () => {
    return (
        <Card className="dark:bg-neutral-950 border-none bg-none space-y-6 animate-pulse">
            <CardHeader>
                <CardTitle>
                    <Skeleton className="h-8 w-3/4 mb-2" />
                </CardTitle>
                <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent className="space-y-6">
                <Skeleton className="w-full h-48 sm:h-64 md:h-[400px] rounded" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[90%]" />
                    <Skeleton className="h-4 w-[85%]" />
                    <Skeleton className="h-4 w-[80%]" />
                    <Skeleton className="h-4 w-[70%]" />
                </div>
            </CardContent>
        </Card>
    );
};

export default DetailSkeleton;