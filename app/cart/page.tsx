"use client";
import SectionHeader from "@/components/SectionHeader";
import { CartDetailsCard } from "@/components/cards/CartProductCard";
import CartSummerySkeleton from "@/components/skeletons/CartSummerySkeleton";
import { ProductListSkeletonCard } from "@/components/skeletons/ProductListSkeletonCard";
import { Button } from "@/components/ui/button";
import { useCartAction } from "@/hooks/useCartAction";
import { formatPrice } from "@/lib/utils";
import { fetchCart } from "@/services/api/cartApi";
import type { CartItem, ORDER_STATUS, Product } from "@prisma/client";
import Image from "next/image";
import React, { type ReactNode, useEffect, useState } from "react";
import EmptyCart from "../../public/svg/empty-cart.png";
export interface CartData extends CartItem {
  product: Product;
}

function Cart() {
  const [cart, setCart] = useState<CartData[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const { calculateTotal, onCheckOut, deleteCartItem } = useCartAction({
    cart,
    setCart,
  });

  const handleCheckout = async () => {
    try {
      setLoadingButton(true);
      const data = await onCheckOut();
      if (data.data) {
        const response = await fetch(
          // @ts-ignore
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${cart[0].cartId}/delete`,
          {
            method: "DELETE",
          }
        );

        const data = await response.json();
        return data;
      }
    } catch (err) {
      setLoadingButton(true);
      console.error(err);
    } finally {
      setLoadingButton(false);
    }
  };

  useEffect(() => {
    const getCartProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchCart();
        setCart(data);
      } catch (err) {
        setLoading(true);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getCartProduct();
  }, []);
  return (
    <div className="container mx-auto mt-36 ">
      <SectionHeader title="Cart Products" description="See all your cart" />
      <div className="lg:flex lg:space-x-5 lg:space-y-0 space-y-20 mt-10">
        <div className=" lg:max-w-[60%] sm:w-full">
          <div className="space-y-6 w-full">
            {loading ? (
              <ProductListSkeletonCard />
            ) : (
              (cart &&
                cart.length > 0 &&
                cart.map((item) => (
                  <CartDetailsCard
                    key={item.id}
                    cart={cart}
                    data={item}
                    setCart={setCart}
                  />
                ))) || (
                <div className="w-full flex justify-center">
                  {" "}
                  <Image src={EmptyCart} alt="Empty Cart" />{" "}
                </div>
              )
            )}
          </div>
        </div>
        <div className="lg:max-w-[40%] bg-white sm:w-full rounded-xl shadow-sh-card">
          {loading ? (
            <CartSummerySkeleton />
          ) : (
            <div className="w-full h-full flex flex-col p-4 sm:px-6 justify-between">
              <div className="flex flex-col">
                <h1 className="font-semibold text-2xl border-b-[1px] border-accent pb-2">
                  Cart Summery
                </h1>
                <div className="flex w-full justify-between items-center">
                  <h1 className="font-semibold text-xl py-2">Total</h1>
                  <span className="font-semibold text-lg">
                    {/* @ts-expect-error */}
                    {formatPrice(Number.parseFloat(calculateTotal()))}
                  </span>
                </div>
              </div>

              <Button
                variant="default"
                // onClick={async () => await onCheckOut(cart.map((item) => item))}
                className="rounded-lg w-full place-items-end place-self-end justify-items-end"
                onClick={handleCheckout}
                disabled={loadingButton}
              >
                {loadingButton
                  ? "Preparing Checkout 🏃‍♂️‍➡️"
                  : "Proceed to Checkout"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
