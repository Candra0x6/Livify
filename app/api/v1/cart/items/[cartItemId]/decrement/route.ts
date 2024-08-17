import { getSession } from "@/lib/auth/auth";
import prisma from "@/lib/db";
import { errorHandler } from "@/middleware";
import { decrementCart, incrementCart } from "@/services/db/cartService";
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

    const item = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
      select: {
        quantity: true,
        cartId: true
      }
    })

    if (item?.quantity as number < 0) {
      await prisma.cartItem.delete({
        where: { id: cartItemId }
      })
      await prisma.cart.delete({
        where: { userId: session.userId, id: item?.cartId }
      })
      throw new AppError(400, "Quantity cannot be negative")
    }
    const cart = await decrementCart(prisma, {
      cartItemId,
      userId: session.userId
    })
    return ApiResponse.success(
      {
        message: "Successfully decrement cart", data: {
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