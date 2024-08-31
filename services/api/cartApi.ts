import type { CartData } from "@/components/cards/CartProductCard";
import type { AllCartProducts } from "@/interfaces/models/Cart";

export const fetchCart = async (): Promise<AllCartProducts> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data: AllCartProducts = await res.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching cart");
  }
};
