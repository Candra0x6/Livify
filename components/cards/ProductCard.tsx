"use client";
import slugify from "@/hooks/slugify";
import { useProductActions } from "@/hooks/useProductAction";
import type { ProductDetails } from "@/interfaces/models/Product";
import { formatPrice } from "@/lib/utils";
import { fetchProducts } from "@/services/api/productsApi";
import type { Product } from "@prisma/client";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, type FC } from "react";
import { FaStar } from "react-icons/fa6";
import { Button } from "../ui/button";

export type ProductDetailsProps = {
  data: ProductDetails;
};
export const ProductCard: React.FC<ProductDetailsProps> = React.memo(
  ({ data }) => {
    const { addCart, addWishlist } = useProductActions();
    const handleAddToCart = () =>
      addCart({ productId: data.id, storeId: data.storeId, quantity: 1 });
    const handleAddToWishlist = () =>
      addWishlist({ productId: data.id, storeId: data.storeId });
    return (
      <div className="group/card shadow-lg border hover:shadow-2xl duration-300 transition-all rounded-2xl space-y-4 md:p-4 p-3 bg-white hover:bg-meta cursor-pointer">
        <Link
          href={`/products/${slugify(data?.Store?.name)}/${
            data?.slug
          }?productId=${data.id}`}
        >
          <div className="aspect-square rounded-2xl bg-gray-100 relative w-full">
            <Button
              size="icon"
              variant="secondary"
              className="p-0 rounded-full aspect-square absolute sm:m-2 m-1 right-0 md:w-10 md:h-10 w-8 h-8 z-30"
              onClick={handleAddToWishlist}
            >
              <Heart className="md:p-[2px] md:w-10 w-4 p-0" />
            </Button>
            <Image
              loading="lazy"
              priority={false}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              // @ts-ignore
              src={data?.images[0]}
              alt={data?.name}
              className="aspect-square object-fill rounded-2xl w-full h-full"
            />
          </div>
        </Link>

        <div className="space-y-3">
          <Link
            href={`/products/${slugify(data?.Store?.name)}/${
              data?.slug
            }?productId=${data.id}`}
          >
            <div className="flex justify-between">
              <h1 className="capitalize text-foreground font-medium md:text-xl text-sm">
                {data?.name}
              </h1>
              <div className="flex items-center gap-x-1">
                <FaStar color="#f8ed24" className="md:w-5 w-3" />
                <span className="md:text-base text-xs">4.5</span>
              </div>
            </div>

            <span className="md:text-base text-xs">{data?.Category?.name}</span>
          </Link>
          <div className="flex justify-between">
            <span className="text-primary font-bold md:text-xl text-md">
              {/* @ts-expect-error */}
              {formatPrice(Number.parseFloat(data?.price))}
            </span>
            <Button
              size="icon"
              variant="secondary"
              className="p-0 rounded-full aspect-square md:w-10 md:h-10 w-8 h-8"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="md:p-[2px] md:w-10 w-4 p-0 " />
            </Button>
          </div>
        </div>
      </div>
    );
  }
);
