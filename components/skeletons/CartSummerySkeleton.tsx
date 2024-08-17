import { Skeleton } from "../ui/skeleton";

export default function CartSummerySkeleton() {
  return (
    <div className="w-full h-full flex flex-col p-4 sm:px-6 justify-between bg-background">
      <div className="flex flex-col">
        <Skeleton className="w-36 h-6 mb-5" />
        <div className="flex w-full justify-between items-center mb-2">
          <Skeleton className="w-20 h-4" />

          <Skeleton className="w-20 h-4" />
        </div>
      </div>

      <Skeleton className="w-full h-10" />
    </div>
  );
}
