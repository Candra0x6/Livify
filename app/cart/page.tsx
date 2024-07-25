"use client";
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

interface CartData extends CartItem {
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

  const handleDecrementCart = async (cartItemId: string) => {
    const itemToUpdate = cart.find((item) => item.id === cartItemId);
    if (!itemToUpdate) return;

    const newQuantity = Math.max(0, itemToUpdate.quantity - 1);

    if (newQuantity === 0) {
      await handleDeleteCart(itemToUpdate.id);
    } else {
      // Otherwise, update the quantit
      const updatedCart = cart.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      );
      setCart(updatedCart);

      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/items/${cartItemId}/decrement`,
          {
            method: "PUT",
          }
        );
      } catch (error) {
        console.error("Error decrementing item:", error);
        fetchCart(); // Rollback if the operation fails
      }
    }
  };

  const handleIncrementCart = async (cartItemId: string) => {
    const updatedCart = cart.map((item) =>
      item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/items/${cartItemId}/increment`,
        {
          method: "PUT",
        }
      );
    } catch (error) {
      console.error("Error incrementing item:", error);
      fetchCart(); // Rollback if the operation fails
    }
  };

  const handleDeleteCart = async (cartItemId: string) => {
    const updatedCart = cart.filter((item) => item.id !== cartItemId);
    setCart(updatedCart);

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/items/${cartItemId}/delete`,
        {
          method: "DELETE",
        }
      );
    } catch (error) {
      console.error("Error deleting item:", error);
      fetchCart(); // Rollback if the operation fails
    }
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.quantity * item.product.price,
      0
    );
  };

  const onCheckOut = async () => {
    try {
      const productBodies: productBody[] = cart.map((item) => ({
        productId: item.product.id,
        price: item.product.price as unknown as number,
        quantity: item.quantity,
        storeId: item.product.storeId,
      }));

      await createOrder(productBodies, "SOLO");

      setCart([]);

      alert("Order placed successfully!");
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex-1 overflow-auto px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-2xl space-y-6">
          {cart &&
            cart.length > 0 &&
            cart.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[80px_1fr_auto] items-center gap-4 rounded-lg bg-muted p-10 shadow-sm"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  width={80}
                  height={80}
                  className="aspect-square rounded-md object-cover bg-black"
                />
                <div className="space-y-1">
                  <h3 className="text-base font-medium">{item.product.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    ${item.product.price as unknown as ReactNode}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDecrementCart(item.id)}
                  >
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  <span className="text-base font-medium">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleIncrementCart(item.id)}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
                <Button onClick={() => handleDeleteCart(item.id)}>
                  <Trash />
                </Button>
              </div>
            ))}
          <div className="bottom-0 z-10 flex h-16 w-full items-center justify-between bg-background px-4 shadow-lg sm:px-6">
            <div className="space-y-1">
              <p className="text-sm font-medium">Total</p>
              <p className="text-xl font-bold">
                ${calculateTotal().toFixed(2)}
              </p>
            </div>
            <Button
              onClick={async () => await onCheckOut(cart.map((item) => item))}
              size="lg"
              className="rounded-full px-8 bg-pink text-white"
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
