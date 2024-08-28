import slugify from "@/hooks/slugify";
import { useProductActions } from "@/hooks/useProductAction";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { type FC, type ReactNode, memo } from "react";
import { FaStar } from "react-icons/fa6";
import { FiHeart } from "react-icons/fi";
import { LuShoppingCart } from "react-icons/lu";
import { Button } from "../ui/button";
import Flex from "../ui/flex";
import type { ProductDetailsProps } from "./ProductCard";

const ProductListCard: FC<ProductDetailsProps> = memo(({ data }): ReactNode => {
  const { addCart, addWishlist } = useProductActions();
  const handleAddToCart = () =>
    addCart({ productId: data.id, storeId: data.storeId, quantity: 1 });
  const handleAddToWishlist = () =>
    addWishlist({ productId: data.id, storeId: data.storeId });
  return (
    <div className="group/card border duration-300 transition-all sm:w-full sm:h-full h-[150px] group cursor-pointer relative overflow-hidden flex sm:gap-x-10 gap-x-5 bg-white shadow-sh-card rounded-xl sm:p-4 p-3">
      <Link
        href={`/products/${slugify(data?.Store?.name)}/${
          data?.slug
        }?productId=${data.id}`}
      >
        <div className="relative bg-[#F6F7FB] md:w-36 md:h-36 w-[7.8rem] h-[7.8rem]  aspect-square">
          <Image
            loading="lazy"
            fill
            // @ts-ignore
            src={data.images[0]}
            alt={data.name}
            className="w-full h-full aspect-square rounded-xl"
          />
        </div>
      </Link>
      <div className=" sm:space-y-2 space-y-7 w-full">
        <Link
          href={`/products/${slugify(data?.Store?.name)}/${
            data?.slug
          }?productId=${data.id}`}
        >
          <div className="sm:mb-5">
            <Flex justify="space-between" align="center">
              <div className="w-full">
                <div className="flex w-full justify-between">
                  <h1 className="sm:text-2xl text-lg font-semibold">
                    {data.name}{" "}
                  </h1>
                </div>
                {/* category */}
                <span className="sm:text-base text-sm">Chair</span>
              </div>
            </Flex>
            <Flex className="gap-x-2">
              <div className="flex items-center gap-x-1">
                <FaStar color="#f8ed24" className="sm:w-[20px] w-[15px]" />
                <span className="text-sm">4.5</span>
              </div>
            </Flex>
          </div>
        </Link>
        <div className="w-full flex justify-between ">
          <span className="text-primary font-bold sm:text-xl text-md items-end flex">
            {/*@ts-expect-error */}
            {formatPrice(Number.parseFloat(data.price))}
          </span>
          <div className="flex gap-x-2 items-center">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full lg:w-10 lg:h-10  w-7 h-7"
              onClick={handleAddToCart}
            >
              <LuShoppingCart className="text-primarytext lg:text-2xl" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full lg:w-10 lg:h-10 w-7 h-7"
              onClick={handleAddToWishlist}
            >
              <FiHeart className=" lg:text-lg" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProductListCard;
