import { Skeleton } from "@/components/ui/skeleton";

export function ProductListSkeletonCard() {
  return (
    <>
      {Array.from({ length: 2 }).map((_, i) => (
        <div
          key={i}
          className="group/card border flex sm:gap-x-10 gap-x-5 shadow-sh-card rounded-xl sm:p-4 p-3 mb-4"
        >
          <div className="relative bg-[#F6F7FB] md:w-36 md:h-36 w-[7.8rem] h-[7.8rem] aspect-square">
            <Skeleton className="w-full h-full" />
          </div>
          <div className="sm:space-y-2 space-y-7 w-full">
            <div className="sm:mb-5 flex flex-col justify-between h-full">
              <Skeleton className="w-40 h-5" />
              <Skeleton className="w-32 h-5" />
              <Skeleton className="w-20 h-5" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
