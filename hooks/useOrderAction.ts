import type { productBody } from "@/app/products/(route)/[storeSlug]/[productSlug]/page";
import toast from "react-hot-toast";
import { useCartAction } from "./useCartAction";

export const useOrderAction = () => {
  const confirmOrder = async (orderId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/order/${orderId}/confirm`,
        {
          method: "PUT",
        },
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error);
      } else {
        toast.success(data.message);
      }
      return data;
    } catch {
      throw new Error("Failed to confirm order");
    }
  };

  const cancleOrder = async (orderId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/order/${orderId}/cancle`,
        {
          method: "PUT",
        },
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error);
      } else {
        toast.success(data.message);
      }
      return data;
    } catch {
      throw new Error("Failed to cancle order");
    }
  };

  const rejectOrder = async (orderId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/order/${orderId}/reject`,
        {
          method: "PUT",
        },
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error);
      } else {
        toast.success(data.message);
      }
      return data;
    } catch {
      throw new Error("Failed to confirm order");
    }
  };

  const createOrder = async (
    orderItems: productBody[] | undefined,
    orderAddress: string,
  ) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/order/new`,
      {
        method: "POST",
        body: JSON.stringify({ orderItems, orderAddress }),
      },
    );
    const data = await response.json();
    if (!response.ok) {
      toast.error("Failed to Checkout");
    } else {
      toast.success(data.message);
    }
    return data;
  };

  return { rejectOrder, confirmOrder, cancleOrder, createOrder };
};
