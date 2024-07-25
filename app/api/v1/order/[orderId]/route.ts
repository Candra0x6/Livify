import prisma from "@/lib/db";
import { errorHandler } from "@/middleware";
import { getOrderById } from "@/services/orderService";
import { AppError } from "@/utils/api/apiErrors";
import { ApiResponse } from "@/utils/api/apiResponse";
import type { NextRequest } from "next/server";
import { z } from "zod";

export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } },
) {
  try {
    const orderId = params.orderId;

    if (!orderId) {
      throw new AppError(401, "Missing or Invalid order Id");
    }
    const order = await getOrderById(prisma, orderId);

    if (!order) {
      throw new AppError(404, "No order found");
    }

    return ApiResponse.success(
      {
        orders: order,
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
