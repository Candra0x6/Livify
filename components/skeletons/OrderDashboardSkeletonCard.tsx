import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function OrderDashboardSkeletonCard() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="bg-white p-4 rounded-lg w-full space-y-5">
          <CardHeader className="flex items-center justify-between w-full">
            <Skeleton className="w-[70%] h-5" />
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Skeleton className="w-10 h-10 rounded-full" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Skeleton className="w-10 h-10" />
          </CardContent>
          <CardFooter className="text-green-500 space-x-2">
            <Skeleton className="w-[90%] h-5" />
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
