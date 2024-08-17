import type { WishlistProductType } from "@/app/wishlist/page";
import { getSession } from "@/lib/auth/auth";
import type { queryPayload } from "@/lib/validators/productSchema";
import type { Product } from "@prisma/client";

export const fetchWishlistProduct = async (
  query: queryPayload,
): Promise<WishlistProductType[] | undefined> => {
  try {
    const session = await getSession();
    const userId = session?.userId;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/${userId}/wishlist?limit=${query.limit || 10}&page=${query.page || 1}${query.categoryId && `&categoryId=${query.categoryId}`}&sortBy=${query.sortBy || "createdAt"}&sortOrder=${query.sortOrder || "desc"}`,
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      },
    );
    const data: { wishlists: WishlistProductType[] } = await response.json();
    return data.wishlists;
  } catch (error) {
    throw new Error(`Failed to fetch products ${error}`);
  }
};
