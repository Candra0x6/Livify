"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { getSession } from "@/lib/auth/auth";
import type { Product, Wishlist } from "@prisma/client";
import { useEffect, useState } from "react";
import type { deleteWishlistBody } from "../api/v1/user/[userId]/wishlist/[wishlistId]/delete/route";

interface dataType extends Wishlist {
  product: Product;
}
export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<dataType[]>([]);
  useEffect(() => {
    const getWishlist = async () => {
      const session = await getSession();
      const userId = session?.userId;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/${userId}/wishlist`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      setWishlist(data.wishlists);
    };
    getWishlist();
  }, []);

  const removeWishlist = async ({
    productId,
    wishlistId,
  }: deleteWishlistBody) => {
    const session = await getSession();
    const userId = session?.userId;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/${userId}/wishlist/${wishlistId}/delete`,
      {
        method: "DELETE",
        body: JSON.stringify({ productId, wishlistId }),
      }
    );
    const data = await res.json();
    console.log(data);
  };
  return (
    <div className="grid grid-cols-[240px_1fr] gap-16 p-8">
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold">Filters</h2>
        <Accordion type="single" collapsible>
          <AccordionItem value="category">
            <AccordionTrigger className="text-lg font-medium">
              Category
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-2">
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox />
                  Clothing
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox />
                  Accessories
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox />
                  Electronics
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox />
                  Home & Garden
                </Label>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="price">
            <AccordionTrigger className="text-lg font-medium">
              Price
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <span>$0</span>
                  <span>$100</span>
                </div>
                <Slider min={0} max={100} step={10} defaultValue={[0, 100]} />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="rating">
            <AccordionTrigger className="text-lg font-medium">
              Rating
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-2">
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox />4 stars and above
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox />3 stars and above
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox />2 stars and above
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox />1 star and above
                </Label>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist &&
          wishlist.length > 0 &&
          wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-background rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={item.product.images[0]}
                alt="Product"
                width={300}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium">{item.product.name}</h3>
                <p className="text-gray-500 text-sm">
                  ${item.product.price as unknown as number}
                </p>
                <Button
                  size="sm"
                  className="mt-4 w-full bg-pink text-white font-medium"
                >
                  Add to Cart
                </Button>

                <Button
                  onClick={() =>
                    removeWishlist({
                      productId: item.productId,
                      wishlistId: item.id,
                    })
                  }
                  size="sm"
                  className="mt-4 w-full bg-pink text-white font-medium"
                >
                  Remove Wishlist{" "}
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
