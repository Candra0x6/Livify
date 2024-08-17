
import { encrypt, getSession } from "@/lib/auth/auth";
import prisma from "@/lib/db";
import { addToCart } from "@/services/db/cartService";
import { AppError } from "@/utils/api/apiErrors";
import { ApiResponse } from "@/utils/api/apiResponse";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export interface cartBody {
  productId: string,
  quantity: number,
  storeId: string,

}
export async function POST(request: Request) {
  try {
    const session = await getSession();
    const {
      productId,
      quantity,
      storeId
    }: cartBody = await request.json();

    if (!session?.userId || typeof session.userId !== "string") {
      throw new AppError(400, 'Unauthorized')
    }

    if (
      !productId ||
      !quantity ||
      !storeId
    ) {
      throw new AppError(401, 'Missing Data')
    }

    const { cart, cartItem } = await addToCart(prisma, {
      productId,
      quantity,
      storeId,
      userId: session.userId
    })
    return ApiResponse.success({
      data: {
        carts: {
          cart,
          cartItems: {
            cartItem
          }
        }
      }
    }, 201)
  } catch (error) {
    console.error("Error adding cart:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { message: "Database error", code: error },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { message: "Unable add to cart", code: error },
      { status: 500 },
    );
  }
}
