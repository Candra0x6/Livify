import prisma from "@/lib/db";
import { ordersQuerySchema } from "@/lib/validators/orderSchema";
import { errorHandler } from "@/middleware";
import { getUserOrders } from "@/services/db/orderService";
import { AppError } from "@/utils/api/apiErrors";
import { ApiResponse } from "@/utils/api/apiResponse";
import type { NextRequest } from "next/server";
import { z } from "zod";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } },
) {
  try {
    const userId = params.userId;
    const url = new URL(request.url);

    const { limit, page, categoryId, sortBy, sortOrder, status } =
      ordersQuerySchema.parse({
        limit: url.searchParams.get("limit") || "10",
        page: url.searchParams.get("page") || "1",
        categoryId: url.searchParams.get("categoryId") || undefined,
        sortBy: url.searchParams.get("sortBy") || "createdAt",
        sortOrder: url.searchParams.get("sortOrder") || "desc",
        status: url.searchParams.get("status") || undefined,
      });

    if (!userId) {
      throw new AppError(401, "Missing or Invalid User Id");
    }
    const order = await getUserOrders(prisma, userId as string, {
      page,
      limit,
      categoryId,
      sortBy,
      sortOrder,
      status,
    });

    if (!order) {
      throw new AppError(404, "No user found");
    }

    return ApiResponse.success(
      {
        data: order,
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
