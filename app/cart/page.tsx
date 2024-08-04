"use client";
import SectionHeader from "@/components/SectionHeader";
import { CartDetailsCard } from "@/components/cards/CartProductCard";
import { Button } from "@/components/ui/button";
import type { CartItem, ORDER_STATUS, Product } from "@prisma/client";
import { MinusIcon, PlusIcon, Trash } from "lucide-react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import React, { type ReactNode, useEffect, useState } from "react";
import {
  createOrder,
  type productBody,
} from "../products/(route)/[storeId]/[productSlug]/page";

export interface CartData extends CartItem {
  product: Product;
}

function Cart() {
  const router = useRouter();
  const [cart, setCart] = useState<CartData[]>([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      setCart(data.carts.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  return (
    <div className="container mx-auto mt-36 ">
      <SectionHeader title="Cart Products" description="See all your cart" />
      <div className="lg:flex lg:space-x-5 lg:space-y-0 space-y-20 mt-10">
        <div className=" lg:max-w-[60%] sm:w-full">
          <div className="space-y-6 w-full">
            {cart &&
              cart.length > 0 &&
              cart.map((item) => (
                // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
                <CartDetailsCard
                  key={item.id}
                  cart={cart}
                  fetchCart={fetchCart}
                  id={item.id}
                  image={item.product.images[0]}
                  name={item.product.name}
                  quantity={item.quantity}
                  setCart={setCart}
                />
              ))}
          </div>
        </div>
        <div className="lg:max-w-[40%] bg-white sm:w-full rounded-xl shadow-sh-card">
          <div className="w-full h-full flex flex-col p-4 sm:px-6 justify-between">
            <div className="flex flex-col">
              <h1 className="font-semibold text-2xl border-b-[1px] border-accent pb-2">
                Cart Summery
              </h1>
              <div className="flex w-full justify-between items-center">
                <h1 className="font-semibold text-xl py-2">Total</h1>
                <span className="font-semibold text-lg">$45.22</span>
              </div>
            </div>

            <Button
              variant="default"
              onClick={async () => await onCheckOut(cart.map((item) => item))}
              className="rounded-lg w-full place-items-end place-self-end justify-items-end"
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
