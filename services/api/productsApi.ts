import type { queryPayload } from "@/lib/validators/productSchema";
import type { AllCategories, AllProducts, ProductDetailsRes, ProductSearch } from "@/types/api/response/ProductResponse";
import type { StoreProducts } from "@/types/api/response/StoreResponse";
import type { Category, Product, Store, Wishlist } from "@prisma/client";

export const fetchProducts = async (
  query: queryPayload,
): Promise<AllProducts> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products?limit=${query.limit || 10}&page=${query.page || 1}${query.categoryId && `&categoryId=${query.categoryId}`}&sortBy=${query.sortBy || "createdAt"}&sortOrder=${query.sortOrder || "desc"}`,
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      },
    );
    const data: AllProducts = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch products ${error}`);
  }
};

export const fetchCategory = async (): Promise<AllCategories> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/category`,
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      },
    );
    const data: { categories: Category[] } = await response.json();
    return data;
  } catch {
    throw new Error("Failed to fetch categories");
  }
};

export const fetchStoreProducts = async (
  storeId: string,
): Promise<StoreProducts> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/store/${storeId}/products`,
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      },
    );
    const data: StoreProducts = await response.json();
    return data;
  } catch {
    throw new Error("Failed to fetch products");
  }
};

export const fetchProductById = async (
  productId: string,
): Promise<ProductDetailsRes> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${productId}`,
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
};

export const fetchRecommendationProducts = async (
  productId: string,
  query: queryPayload,
): Promise<AllProducts> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${productId}/recommendations?limit=${query.limit || 10}&page=${query.page || 1}${query.categoryId && `&categoryId=${query.categoryId}`}&sortBy=${query.sortBy || "createdAt"}&sortOrder=${query.sortOrder || "desc"}`,
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      },
    );
    const data: AllProducts = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch products ${error}`);
  }
};
type searchQueryPayload = {
  query: string;
  format?: "simple" | "detailed";
  limit?: number;
  page?: number;
  sortOrder?: "asc" | "desc";
};

export const fetchStoreProductsBySearch = async (
  storeId: string,
  query: searchQueryPayload,
): Promise<StoreProducts> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/store/${storeId}/products/search?query=${query.query || ""}&limit=${query.limit || 10}&page=${query.page || 1}&sortOrder=${query.sortOrder || "desc"}`,
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      },
    );
    const data: StoreProducts = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch products ${error}`);
  }
};

export const fetchProductsBySearch = async (
  query: searchQueryPayload,
): Promise<ProductSearch> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/search?query=${query.query || ""}&limit=${query.limit || 10}&page=${query.page || 1}&sortOrder=${query.sortOrder || "desc"}`,
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      },
    );
    const data: ProductSearch =
      await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch products ${error}`);
  }
};
