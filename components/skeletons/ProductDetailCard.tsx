import Flex from "../ui/flex";
import Grid from "../ui/grid";
import { Skeleton } from "../ui/skeleton";

export function ProductDetailSkeletonCard() {
  return (
    <div className="rounded-lg shadow-sh-card mt-32 w-full">
      <div className="p-10 grid md:grid-cols-2 grid-rows-1 grid-cols-1 gap-10 h-full">
        <Flex className="flex-col">
          <div className="">
            <Skeleton className="w-full h-full aspect-square" />
          </div>
          <div className="grid grid-cols-3 mt-5 gap-5">
            <Skeleton className="w-full h-full aspect-square" />
            <Skeleton className="w-full h-full aspect-square" />
            <Skeleton className="w-full h-full aspect-square" />
          </div>
        </Flex>
        <Flex direction="column" className="space-y-6 max-h-[500px]">
          <Flex direction="column" className="gap-y-5">
            <Skeleton className="w-1/2 h-5" />
            <Skeleton className="w-1/4 h-5" />
            <Skeleton className="w-1/3 h-5" />
          </Flex>
          <Flex direction="column">
            <Skeleton className="w-1/3 h-8 mt-20" />
          </Flex>

          <Flex gap={20} className="pt-5">
            <Skeleton className="w-1/4 h-10" />
            <Skeleton className="w-1/4 h-10" />
          </Flex>
        </Flex>
      </div>
    </div>
  );
}
