import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export const SkeletonProgramCard = () => {
  return (
    <Card className="overflow-hidden group cursor-pointer transition-all duration-300 border-border/50">
      <div className="aspect-video relative bg-muted">
        <Skeleton className="absolute inset-0" />
      </div>
      <div className="p-4 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </Card>
  );
};
