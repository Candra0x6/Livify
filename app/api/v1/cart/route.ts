import { getSession } from "@/lib/auth/auth";
import prisma from "@/lib/db";
import { errorHandler } from "@/middleware";
import { getUserCart } from "@/services/db/cartService";
import { AppError } from "@/utils/api/apiErrors";
import { ApiResponse } from "@/utils/api/apiResponse";
import type { NextRequest } from "next/server";
import { z } from "zod";

export async function GET(
  request: NextRequest,
) {
  try {
    const session = await getSession()
    const userId = session?.userId

    if (!userId) {
      throw new AppError(401, "Unauthorized");
    }
    const cart = await getUserCart(prisma, userId);

    if (!cart) {
      throw new AppError(404, "No prtoduct found");
    }

    return ApiResponse.success(
      {
        carts: cart,
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
