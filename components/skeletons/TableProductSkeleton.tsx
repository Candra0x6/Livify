import { Skeleton } from "../ui/skeleton";
import { TableCell, TableRow } from "../ui/table";

export default function TableProductSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <TableRow
          key={i}
          className="border-y-[1px] border-accent w-full animate-pulse bg-gray-100"
        >
          <TableCell className="">
            <Skeleton className="w-full aspect-square" />
          </TableCell>
          <TableCell className="">
            <Skeleton className="w-full h-5" />
          </TableCell>
          <TableCell className="">
            <Skeleton className="w-full h-5" />
          </TableCell>
          <TableCell className="">
            <Skeleton className="w-full h-5" />
          </TableCell>{" "}
          <TableCell className="">
            <Skeleton className="w-full h-5" />
          </TableCell>{" "}
          <TableCell className="">
            <Skeleton className="w-full h-5" />
          </TableCell>
          <TableCell className="">
            <Skeleton className="w-full h-5" />
          </TableCell>{" "}
        </TableRow>
      ))}
    </>
  );
}
