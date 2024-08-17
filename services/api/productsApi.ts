import type { queryPayload } from "@/lib/validators/productSchema";
import type { Category, Product, Store, Wishlist } from "@prisma/client";

export interface Pagination {
  pages: number;
  limit: number;
  totalPages: number;
  total: number;
}

export interface ProductCat extends Product {
  Category: Category;
}
export interface ProductResponse {
  pagination: Pagination;
  products: ProductCat[];
}

export interface ProductsResponse extends Product {
  Category: Category;
  Store: Store;
  Wishlist: Wishlist[];
}
export const fetchProducts = async (
  query: queryPayload,
): Promise<ProductsResponse[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products?limit=${query.limit || 10}&page=${query.page || 1}${query.categoryId && `&categoryId=${query.categoryId}`}&sortBy=${query.sortBy || "createdAt"}&sortOrder=${query.sortOrder || "desc"}`,
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      },
    );
    const data: { products: ProductsResponse[] } = await response.json();
    return data.products;
  } catch (error) {
    throw new Error(`Failed to fetch products ${error}`);
  }
};

export const fetchCategory = async (): Promise<{ categories: Category[] }> => {
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
): Promise<ProductResponse | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/store/${storeId}/products`,
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      },
    );
    const data: ProductResponse = await response.json();
    return data;
  } catch {
    throw new Error("Failed to fetch products");
  }
};

export const fetchProductById = async (
  productId: string,
): Promise<{ product: ProductsResponse } | undefined> => {
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
): Promise<ProductsResponse[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${productId}/recommendations?limit=${query.limit || 10}&page=${query.page || 1}${query.categoryId && `&categoryId=${query.categoryId}`}&sortBy=${query.sortBy || "createdAt"}&sortOrder=${query.sortOrder || "desc"}`,
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      },
    );
    const data: { products: ProductsResponse[] } = await response.json();
    return data.products;
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
): Promise<{ products: ProductsResponse[] } | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/store/${storeId}/products/search?query=${query.query || ""}&limit=${query.limit || 10}&page=${query.page || 1}&sortOrder=${query.sortOrder || "desc"}`,
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      },
    );
    const data: { data: { products: ProductsResponse[] } } =
      await response.json();
    return data.data;
  } catch (error) {
    throw new Error(`Failed to fetch products ${error}`);
  }
};

export const fetchProductsBySearch = async (
  query: searchQueryPayload,
): Promise<{ data: [{ category: string; products: ProductsResponse[] }] }> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/search?query=${query.query || ""}&limit=${query.limit || 10}&page=${query.page || 1}&sortOrder=${query.sortOrder || "desc"}`,
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      },
    );
    const data: { data: [{ category: string; products: ProductsResponse[] }] } =
      await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch products ${error}`);
  }
};
