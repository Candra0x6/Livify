import { getSession } from "@/lib/auth/auth";
import prisma from "@/lib/db";
import { errorHandler } from "@/middleware";
import { updateStatus } from "@/services/db/orderService";
import { AppError } from "@/utils/api/apiErrors";
import { ApiResponse } from "@/utils/api/apiResponse";
import type { NextRequest } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { orderId: string } },
) {
  try {
    const session = await getSession();
    const orderId = params.orderId;

    if (!session) {
      throw new AppError(401, "Unauthorized");
    }
    if (!orderId) {
      throw new AppError(400, "Missing order id");
    }

    const order = await updateStatus(prisma, {
      orderId,
      status: "PROCESSING",
      userId: session.userId,
    });
    return ApiResponse.success(
      { message: " Order successfully confirmed", order },
      201,
    );
  } catch (error) {
    return errorHandler(error);
  }
}
