import { getSession } from "@/lib/auth/auth";
import prisma from "@/lib/db";
import { errorHandler } from "@/middleware";
import { sellerOrderStatus } from "@/services/orderService";
import { AppError } from "@/utils/api/apiErrors";
import { ApiResponse } from "@/utils/api/apiResponse";
import type { NextRequest } from "next/server";

export async function PUT(request: NextRequest, { params }: { params: { orderId: string } }) {
  try {
    const session = await getSession()
    const orderId = params.orderId
    const action = await request.json()
    if (!session) {
      throw new AppError(401, "Unauthorized")
    }
    if (!orderId) {
      throw new AppError(400, "Missing order id")

    }

    if (!action || !['confirm', 'reject'].includes(action)) {
      throw new AppError(400, "Invalid action. Must be 'confirm' or 'reject'");
    }

    const order = sellerOrderStatus(prisma, {
      action,
      orderId,
      storeId: session?.storeId as string
    })
    return ApiResponse.success(
      { message: `Successfully ${action} order`, order },
      201
    )
  } catch (error) {
    return errorHandler(error)
  }
}