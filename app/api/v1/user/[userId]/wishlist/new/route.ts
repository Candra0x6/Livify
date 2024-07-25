import prisma from "@/lib/db";
import { productQuerySchema } from "@/lib/validators/productSchema";
import { errorHandler } from "@/middleware";
import { getAllProducts } from "@/services/productService";
import { addWishlist, getAllWishlist } from "@/services/wishlistService";
import { AppError } from "@/utils/api/apiErrors";
import { ApiResponse } from "@/utils/api/apiResponse";
import type { NextRequest } from "next/server";
import { z } from "zod";

export interface addWIshlistBody {
  productId: string
  storeId: string
}
export async function POST(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const userId = params.userId
    const { productId, storeId }: addWIshlistBody = await request.json()
    const wishlists = await addWishlist(prisma, {
      productId, storeId, userId
    });

    if (!productId || !storeId) {
      throw new AppError(404, "No data found");
    }

    return ApiResponse.success(
      {
        data: {
          message: "Successfully add product to wishlist",
          wishlists
        }
      },
      200,
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ApiResponse.error(`Invalid query parameters ${error}`, 400);
    }
    return errorHandler(error);
  }
}
