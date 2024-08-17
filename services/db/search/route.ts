import prisma from "@/lib/db";
import { productQuerySchema } from "@/lib/validators/productSchema";
import { searchQuerySchema } from "@/lib/validators/searchParamsSchema";
import { errorHandler } from "@/middleware";
import { getAllProducts, mainSearch } from "@/services/db/productService";
import { AppError } from "@/utils/api/apiErrors";
import { ApiResponse } from "@/utils/api/apiResponse";
import type { NextRequest } from "next/server";
import { z } from "zod";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);

    const { limit, page, sortOrder, query, format } = searchQuerySchema.parse({
      query: url.searchParams.get("query"),
      format: url.searchParams.get("format"),
      limit: url.searchParams.get("limit") || "10",
      page: url.searchParams.get("page") || "1",
      sortOrder: url.searchParams.get("sort") || "desc",
    });
    const products = await mainSearch(prisma, {
      page,
      limit,
      sortOrder,
      query,
      format,
    });

    if (!products) {
      throw new AppError(404, "No products found");
    }

    return ApiResponse.success(
      {
        products,
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
