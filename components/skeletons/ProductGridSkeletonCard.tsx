import { Skeleton } from "../ui/skeleton";

export default function ProductGridSkeletonCard() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="group/card shadow-lg border rounded-2xl space-y-4 md:p-4 p-3"
        >
          <div className="aspect-square rounded-2xl bg-gray-100 relative w-full">
            <Skeleton className="w-full h-full" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <Skeleton className="w-28 h-4" />
              <Skeleton className="w-12 h-4" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="w-20 h-4" />
            </div>
            <Skeleton className="w-16 h-4" />
          </div>
        </div>
      ))}
    </>
  );
}
