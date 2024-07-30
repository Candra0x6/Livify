import {
  createOrder,
  type productBody,
} from "@/app/products/(route)/[storeId]/[productSlug]/page";
import type { CartItem, Product } from "@prisma/client";
import { MinusIcon, PlusIcon } from "lucide-react";
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
    <div className="group/card border duration-300 transition-all w-full h-[20vh] group cursor-pointer relative overflow-hidden flex gap-x-10 bg-white shadow-sh-card rounded-xl p-4">
      <div className="relative bg-[#F6F7FB] w-[15rem] aspect-square">
        <img
          src={image}
          alt="l"
          className="w-full h-full aspect-square rounded-xl"
        />
      </div>
      <div className=" space-y-2 w-full">
        <div className="mb-5">
          <Flex justify="space-between" align="center">
            <div className="w-full">
              <div className="flex w-full justify-between">
                <h1 className="text-2xl font-semibold">{name} </h1>
                <Button
                  variant="destructive"
                  className="p-0 aspect-square rounded-full w-10"
                >
                  <IoClose className="text-2xl" />
                </Button>
              </div>
              <span>Chair</span>
            </div>
          </Flex>
          <Flex className="gap-x-2">
            <div className="flex items-center gap-x-1">
              <FaStar size="20px" color="#f8ed24" />
              <span>4.5</span>
            </div>
          </Flex>
        </div>
        <div className="w-full flex justify-between ">
          <span className="text-primary font-bold text-xl  items-end flex">
            $36.21
          </span>
          <div className="flex gap-x-2 items-center">
            <Button
              size="icon"
              variant="default"
              className="p-0 aspect-square w-10"
            >
              <PlusIcon className="p-[2px]" />
            </Button>
            <h1>2</h1>
            <Button
              size="icon"
              variant="default"
              className="p-0 aspect-square w-10"
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
