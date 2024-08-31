import prisma from "@/lib/db";
import { ordersQuerySchema } from "@/lib/validators/orderSchema";
import { errorHandler } from "@/middleware";
import { ordersCustomerSearch } from "@/services/db/orderService";
import { AppError } from "@/utils/api/apiErrors";
import { ApiResponse } from "@/utils/api/apiResponse";
import type { NextRequest } from "next/server";
import { z } from "zod";


export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } },
) {
  try {
    const url = new URL(request.url);
    const userId = params.userId;

    if (!userId) {
      throw new AppError(405, "Unauthorized");
    }

    const { limit, page, query, status, sortBy, sortOrder, categoryId } =
      ordersQuerySchema.parse({
        query: url.searchParams.get("query"),
        limit: url.searchParams.get("limit") || "10",
        page: url.searchParams.get("page") || "1",
        sortOrder: url.searchParams.get("sort") || "desc",
        status: url.searchParams.get("status"),
        sortBy: url.searchParams.get("sortBy") || "createdAt",
        categoryId: url.searchParams.get("categoryId"),
      });
    const orders = await ordersCustomerSearch(prisma, userId, {
      page,
      limit,
      sortOrder,
      query,
      status,
      sortBy,
      categoryId,
    });

    if (orders.orders.length <= 0) {
      throw new AppError(404, "No products found");
    }

    return ApiResponse.success(
      {
        orders: orders.orders,
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
