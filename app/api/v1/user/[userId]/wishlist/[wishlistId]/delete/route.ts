import { getSession } from "@/lib/auth/auth";
import prisma from "@/lib/db";

import { errorHandler } from "@/middleware";
import { addWishlist, deleteWishlist } from "@/services/db/wishlistService";
import { AppError } from "@/utils/api/apiErrors";
import { ApiResponse } from "@/utils/api/apiResponse";
import type { NextRequest } from "next/server";

export interface deleteWishlistBody {
  productId: string
  wishlistId: string
}
export async function DELETE(request: NextRequest, { params }: { params: { userId: string } }) {
  try {

    const session = await getSession();
    const userId = params.userId
    const { productId, wishlistId }: deleteWishlistBody = await request.json()
    if (!session?.userId || !userId) {
      throw new AppError(401, "Unauthorized");
    }

    const wishlist = await deleteWishlist(prisma, {
      productId, wishlistId, userId
    });

    return ApiResponse.success(
      { message: "Successfully unwishlisted product", wishlist },
      201,
    );
  } catch (error) {
    return errorHandler(error);
  }
}