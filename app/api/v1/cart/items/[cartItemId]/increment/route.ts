import { getSession } from "@/lib/auth/auth";
import prisma from "@/lib/db";
import { errorHandler } from "@/middleware";
import { incrementCart } from "@/services/cartService";
import { AppError } from "@/utils/api/apiErrors";
import { ApiResponse } from "@/utils/api/apiResponse";
import type { NextRequest } from "next/server";

export async function PUT(request: NextRequest, { params }: { params: { cartItemId: string } }) {
  try {
    const session = await getSession()
    const cartItemId = params.cartItemId
    if (!session?.userId) {
      throw new AppError(401, "Unauthorized")
    }
    if (!cartItemId) {
      throw new AppError(400, "Missing order id")
    }

    const cart = await incrementCart(prisma, {
      cartItemId,
      userId: session.userId
    })
    return ApiResponse.success(
      {
        message: "Successfully increment cart", data: {
          carts: {
            cart
          }
        }
      },
      201
    )
  } catch (error) {
    return errorHandler(error)
  }
}