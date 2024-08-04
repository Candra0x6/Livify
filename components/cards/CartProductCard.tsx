import {
  createOrder,
  type productBody,
} from "@/app/products/(route)/[storeId]/[productSlug]/page";
import type { CartItem, Product } from "@prisma/client";
import { MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import type { FC } from "react";
import { FaStar } from "react-icons/fa6";
import { FiHeart } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { LuShoppingCart } from "react-icons/lu";
import { PiMagnifyingGlass } from "react-icons/pi";
import { Button } from "../ui/button";
import { ObjectColors } from "../ui/card";
import Flex from "../ui/flex";
import { Heading } from "../ui/heading";
import type { ProductDetailsProps } from "./ProductCard";

export interface CartData extends CartItem {
  product: Product;
}
type CartDetailsProps = {
  id: string;
  image: string;
  name: string;
  quantity: number;
  cart: CartData[];
  setCart: React.Dispatch<React.SetStateAction<CartData[]>>;
  fetchCart: () => void;
};
export const CartDetailsCard: FC<CartDetailsProps> = ({
  cart,
  id,
  image,
  name,
  quantity,
  fetchCart,
  setCart,
}) => {
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
    <div className="group/card border duration-300 transition-all sm:w-full sm:h-full h-[150px] group cursor-pointer relative overflow-hidden flex sm:gap-x-10 gap-x-5 bg-white shadow-sh-card rounded-xl sm:p-4 p-3">
      <div className="relative bg-[#F6F7FB] md:w-36 md:h-36 w-[7.8rem] h-[7.8rem]  aspect-square">
        <img
          fill
          src={image}
          alt="l"
          className="w-full h-full aspect-square rounded-xl"
        />
      </div>
      <div className=" sm:space-y-2 space-y-7 w-full">
        <div className="sm:mb-5">
          <Flex justify="space-between" align="center">
            <div className="w-full">
              <div className="flex w-full justify-between">
                <h1 className="sm:text-2xl text-lg font-semibold">{name} </h1>
                <Button
                  variant="destructive"
                  className="p-0 aspect-square rounded-full sm:w-10 sm:h-10 w-6 h-6"
                >
                  <IoClose className="sm:text-2xl text-md" />
                </Button>
              </div>
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
        <div className="w-full flex justify-between ">
          <span className="text-primary font-bold sm:text-xl text-md items-end flex">
            $36.21
          </span>
          <div className="flex gap-x-2 items-center">
            <Button
              size="icon"
              variant="default"
              className="p-0 aspect-square sm:w-10 sm:h-10 w-6 h-6"
            >
              <PlusIcon className="p-[2px]" />
            </Button>
            <h1>2</h1>
            <Button
              size="icon"
              variant="default"
              className="p-0 aspect-square sm:h-10 sm:w-10 w-6 h-6"
            >
              {" "}
              <MinusIcon className="p-[2px]" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
