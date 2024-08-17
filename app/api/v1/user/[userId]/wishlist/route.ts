import { getSession } from "@/lib/auth/auth";
import prisma from "@/lib/db";
import { productQuerySchema } from "@/lib/validators/productSchema";
import { errorHandler } from "@/middleware";
import { getAllProducts } from "@/services/db/productService";
import { getAllWishlist } from "@/services/db/wishlistService";
import { AppError } from "@/utils/api/apiErrors";
import { ApiResponse } from "@/utils/api/apiResponse";
import type { NextRequest } from "next/server";
import { z } from "zod";

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const session = await getSession();

    if (!session?.userId) {
      throw new AppError(401, "Unauthorized");
    }
    const url = new URL(request.url);
    const userId = params.userId
    const { limit, page, categoryId, sortBy, sortOrder } =
      productQuerySchema.parse({
        limit: url.searchParams.get("limit") || "10",
        page: url.searchParams.get("page") || "1",
        categoryId: url.searchParams.get("categoryId") || undefined,
        sortBy: url.searchParams.get("sortBy") || "createdAt",
        sortOrder: url.searchParams.get("sortOrder") || "desc",
      });

    const { wishlists, total } = await getAllWishlist(prisma, userId, {
      page,
      limit,
      sortBy,
      sortOrder,
      categoryId,
    });

    if (wishlists.length === 0) {
      throw new AppError(404, "No products found");
    }

    return ApiResponse.success(
      {
        wishlists,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
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
