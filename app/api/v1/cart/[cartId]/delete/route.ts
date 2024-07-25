import { getSession } from "@/lib/auth/auth";
import prisma from "@/lib/db";
import { errorHandler } from "@/middleware";
import { deleteCart, incrementCart } from "@/services/cartService";
import { AppError } from "@/utils/api/apiErrors";
import { ApiResponse } from "@/utils/api/apiResponse";
import type { NextRequest } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: { cartId: string } }) {
  try {
    const session = await getSession()
    const cartId = params.cartId
    if (!session?.userId) {
      throw new AppError(401, "Unauthorized")
    }
    if (!cartId) {
      throw new AppError(400, "Missing order id")
    }

    await deleteCart(prisma, {
      cartId,
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