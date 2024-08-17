import type { CartData } from "@/components/cards/CartProductCard";

export const fetchCart = async (): Promise<CartData[] | undefined> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await res.json();
    return data.carts.data;
  } catch (error) {
    throw new Error("Error fetching cart");
  }
};
