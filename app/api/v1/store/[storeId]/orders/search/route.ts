import prisma from "@/lib/db";
import { productQuerySchema } from "@/lib/validators/productSchema";
import { searchQuerySchema } from "@/lib/validators/searchParamsSchema";
import { errorHandler } from "@/middleware";
import {
  ordersCustomerSearch,
  ordersSellerSearch,
} from "@/services/db/orderService";
import { AppError } from "@/utils/api/apiErrors";
import { ApiResponse } from "@/utils/api/apiResponse";
import type { NextRequest } from "next/server";
import { z } from "zod";

export async function GET(
  request: NextRequest,
  { params }: { params: { storeId: string } },
) {
  try {
    const url = new URL(request.url);
    const storeId = params.storeId;

    if (!storeId) {
      throw new AppError(405, "Missing Store Id");
    }

    const { limit, page, sortOrder, query, format } = searchQuerySchema.parse({
      query: url.searchParams.get("query"),
      format: url.searchParams.get("format") || "detailed",
      limit: url.searchParams.get("limit") || "10",
      page: url.searchParams.get("page") || "1",
      sortOrder: url.searchParams.get("sort") || "desc",
    });
    const orders = await ordersSellerSearch(prisma, storeId, {
      page,
      limit,
      sortOrder,
      query,
      format,
    });

    if (orders.orders.length <= 0) {
      throw new AppError(404, "No products found");
    }

    return ApiResponse.success(
      {
        store: orders,
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
