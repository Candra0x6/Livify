import { getSession } from "@/lib/auth/auth";
import prisma from "@/lib/db";
import { errorHandler } from "@/middleware";
import { addWishlist, validateWishlist } from "@/services/db/wishlistService";
import { AppError } from "@/utils/api/apiErrors";
import { ApiResponse } from "@/utils/api/apiResponse";
import type { NextRequest } from "next/server";

interface body {
  productId: string
}
export async function POST(request: NextRequest, { params }: { params: { userId: string } }) {
  try {

    const userId = params.userId
    const productId: string = await request.json()
    const session = await getSession();

    if (!session?.userId || !userId) {
      throw new AppError(401, "Unauthorized");
    }

    if (!productId) {
      throw new AppError(403, "No product id found")
    }
    const wishlist = await validateWishlist(prisma, {
      productId, userId
    });

    if (wishlist) {
      return ApiResponse.success(
        {
          data: {
            wishlistId: wishlist?.id,
            message: true
          }
        },
        201,
      );
    }
    return ApiResponse.success({
      data: {
        wishlistId: null,
        message: false
      }
    })


  } catch (error) {
    return errorHandler(error);
  }
}