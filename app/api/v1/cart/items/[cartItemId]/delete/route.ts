import { getSession } from "@/lib/auth/auth";
import prisma from "@/lib/db";
import { errorHandler } from "@/middleware";
import { deleteCartItem } from "@/services/db/cartService";
import { AppError } from "@/utils/api/apiErrors";
import { ApiResponse } from "@/utils/api/apiResponse";
import type { NextRequest } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: { cartItemId: string } }) {
  try {
    const session = await getSession()
    const cartItemId = params.cartItemId
    if (!session?.userId) {
      throw new AppError(401, "Unauthorized")
    }
    if (!cartItemId) {
      throw new AppError(400, "Missing cart item id")
    }

    await deleteCartItem(prisma, {
      cartItemId,
      userId: session.userId
    })
    return ApiResponse.success(
      {
        message: "Successfully delete cart"
      },
      201
    )
  } catch (error) {
    return errorHandler(error)
  }
}