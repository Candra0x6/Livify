import type { productBody } from "@/app/products/(route)/[storeSlug]/[productSlug]/page";
import type { CartDetailsProps } from "@/components/cards/CartProductCard";
import toast from "react-hot-toast";
import { useOrderAction } from "./useOrderAction";

export const useCartAction = ({ cart, data, setCart }: CartDetailsProps) => {
  const { createOrder } = useOrderAction();
  const decrementCartItem = async ({
    cartItemId,
  }: {
    cartItemId: string | undefined;
  }) => {
    const itemToUpdate = cart?.find((item) => item.id === cartItemId);
    if (!itemToUpdate) return;

    const newQuantity = Math.max(0, itemToUpdate.quantity - 1);

    if (newQuantity === 0) {
      await deleteCartItem({ cartItemId: itemToUpdate.id });
    } else {
      const updatedCart = cart?.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item,
      );
      setCart(updatedCart);

      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/items/${cartItemId}/decrement`,
          {
            method: "PUT",
          },
        );
      } catch (err) {
        throw new Error("Error decrementing item");
      }
    }
  };

  const incrementCartItem = async ({
    cartItemId,
  }: {
    cartItemId: string | undefined;
  }) => {
    const updatedCart = cart?.map((item) =>
      item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item,
    );
    setCart(updatedCart);

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/items/${cartItemId}/increment`,
        {
          method: "PUT",
        },
      );
    } catch (error) {
      throw new Error("Error incrementing item");
    }
  };

  const deleteCartItem = async ({
    cartItemId,
  }: {
    cartItemId: string | undefined;
  }) => {
    const updatedCart = cart?.filter((item) => item.id !== cartItemId);
    setCart(updatedCart);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/items/${cartItemId}/delete`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        toast.error("Failed to Remove Item From Cart");
      } else {
        toast.success("Success Remove Item From Cart");
      }
    } catch (error) {
      toast.error("Oops, we couldn't remove that item from your cart. 🥴");

      throw new Error("Error deleting item");
    }
  };

  const calculateTotal = () => {
    return cart?.reduce(
      (total, item) => total + item.quantity * Number(item.product.price),
      0,
    );
  };

  const onCheckOut = async () => {
    try {
      const productBodies: productBody[] | undefined = cart?.map((item) => ({
        productId: item.product.id,
        price: item.product.price as unknown as number,
        quantity: item.quantity,
        storeId: item.product.storeId,
      }));

      const data = await createOrder(productBodies, "SOLO");
      setCart([]);


      return data

    } catch (error) {
      console.error("Checkout failed:", error);
      toast.error("Uh oh 😖  There was an issue processing your order");
    }
  };
  return {
    decrementCartItem,
    incrementCartItem,
    deleteCartItem,
    onCheckOut,
    calculateTotal,
  };
};
