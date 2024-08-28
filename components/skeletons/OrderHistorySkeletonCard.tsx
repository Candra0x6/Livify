import { CgNotes } from "react-icons/cg";
import Flex from "../ui/flex";
import { Skeleton } from "../ui/skeleton";

export default function OrderHistorySkeletonCard() {
  return (
    <>
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="w-full rounded-lg shadow-sh-card">
          <div className="p-4">
            <div className="max-h-[20%] h-full w-full flex justify-between border-b-[1px] border-accent">
              <div className="flex items-start gap-2 ">
                <Skeleton className="w-7 h-7 aspect-square" />
                <div className="">
                  <Skeleton className="w-20 h-4 " />
                  <Skeleton className="w-20 h-4 my-1" />
                </div>
              </div>
              <Skeleton className="w-20 h-7" />
            </div>
            <div className="max-h-[60%] h-full w-full">
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="group/card sm:w-full sm:h-full h-[150px] group cursor-pointer relative overflow-hidden flex sm:gap-x-10 gap-x-5 rounded-xl sm:p-4 p-3"
                >
                  <div className="relative bg-[#F6F7FB] md:w-36 md:h-36 w-[7.8rem] h-[7.8rem]  aspect-square">
                    <Skeleton className="w-full h-full aspect-square rounded-lg" />
                  </div>
                  <div className=" space-y-2 md:space-y-7 w-full">
                    <div className="sm:mb-5">
                      <Flex justify="space-between" align="center">
                        <div className="w-full">
                          <div className="flex w-full justify-between my-1">
                            <Skeleton className="w-1/2 h-5 aspect-square rounded-lg" />
                          </div>
                          <Skeleton className="w-1/4 h-5 aspect-square rounded-lg" />
                        </div>
                      </Flex>
                      <Flex className="gap-x-2">
                        <div className="flex items-center gap-x-1 my-1 w-full">
                          <Skeleton className="w-1/5 h-5 aspect-square rounded-lg" />
                        </div>
                      </Flex>
                    </div>
                    <div className="w-full md:flex justify-between ">
                      <Skeleton className="w-1/5 h-5 aspect-square rounded-lg" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="max-h-[20%] h-full">
              <Skeleton className="w-20 h-5 aspect-square rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
