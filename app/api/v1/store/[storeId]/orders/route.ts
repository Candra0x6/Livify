import { getSession } from "@/lib/auth/auth";
import prisma from "@/lib/db";
import { ordersQuerySchema } from "@/lib/validators/orderSchema";
import { productQuerySchema } from "@/lib/validators/productSchema";
import { errorHandler } from "@/middleware";
import { getStoreOrders } from "@/services/db/storeService";
import { AppError } from "@/utils/api/apiErrors";
import { ApiResponse } from "@/utils/api/apiResponse";
import type { NextRequest } from "next/server";
import { z } from "zod";

export async function GET(
  request: NextRequest,
  { params }: { params: { storeId: string } },
) {
  try {
    const storeId = params.storeId;
    const url = new URL(request.url);

    const { limit, page, categoryId, status, sortBy, sortOrder } =
      ordersQuerySchema.parse({
        limit: url.searchParams.get("limit") || "10",
        page: url.searchParams.get("page") || "1",
        categoryId: url.searchParams.get("categoryId") || undefined,
        sortBy: url.searchParams.get("sortBy") || "createdAt",
        sortOrder: url.searchParams.get("sortOrder") || "desc",
        status: url.searchParams.get("status") || undefined,
      });

    if (!storeId) {
      throw new AppError(401, "Missing or Invalid Store Id");
    }
    const store = await getStoreOrders(prisma, storeId as string, {
      page,
      limit,
      status,
      sortBy,
      sortOrder,
    });

    if (!store) {
      throw new AppError(404, "No store found");
    }

    return ApiResponse.success(
      {
        store: store,
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
