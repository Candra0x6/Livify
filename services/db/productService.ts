// src/services/productService.ts
import type { productEditPayload } from "@/components/forms/EditProduct";
import slugify from "@/hooks/slugify";
import type { productPayload } from "@/lib/validators/productSchema";
import type { searchQueryPayload } from "@/lib/validators/searchParamsSchema";
import type { Category, Prisma, PrismaClient, Product } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";
import type { ProductsResponse } from "../api/productsApi";

export interface ProductsParams {
  page?: number;
  limit?: number;
  sortBy?: "name" | "price" | "createdAt";
  sortOrder?: "asc" | "desc";
  categoryId?: string;
}

export async function getAllProducts(
  prisma: PrismaClient,
  params: ProductsParams = {},
): Promise<{ products: ProductsResponse[]; total: number }> {
  const {
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
    categoryId,
  } = params;

  const skip = (page - 1) * limit;

  const where: Prisma.ProductWhereInput = categoryId ? { categoryId } : {};

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        Category: true,
        Store: true,
        Wishlist: true,
      },
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    }),
    prisma.product.count({ where }),
  ]);

  return { products, total };
}
interface productType extends productPayload {
  storeId: string;
}

interface productEdit extends productPayload {
  productId: string;
}
export async function createProduct(
  prisma: PrismaClient,
  data: productType,
): Promise<Product> {
  return prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      categoryId: data.categoryId,
      price: Number(data.price),
      images: data.images as unknown as string,
      storeId: data.storeId,
      slug: slugify(data.name),
      stock: Number(data.stock),
    },
  });
}
export async function getStoreProducts(
  prisma: PrismaClient,
  storeId: string,
  params: ProductsParams = {},
): Promise<{ products: Product[]; total: number }> {
  const {
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
    categoryId,
  } = params;

  const skip = (page - 1) * limit;

  const where: Prisma.ProductWhereInput = {
    storeId: storeId,
    ...(categoryId ? { categoryId } : {}),
  };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        Category: true,
      },
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    }),
    prisma.product.count({ where }),
  ]);

  return { products, total };
}

export async function getRecommendationProducts(
  prisma: PrismaClient,
  productId: string,
  params: ProductsParams = {},
): Promise<{ products: ProductsResponse[]; total: number }> {
  const {
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
    categoryId,
  } = params;

  const skip = (page - 1) * limit;

  const where: Prisma.ProductWhereInput = {
    id: {
      not: productId,
    },
  };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        Category: true,
        Store: true,
        Wishlist: true,
      },
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    }),
    prisma.product.count({ where }),
  ]);

  return { products, total };
}

export async function updateProduct(
  prisma: PrismaClient,
  data: productEdit,
): Promise<Product | null> {
  return prisma.product.update({
    where: {
      id: data.productId,
    },
    data: {
      name: data.name,
      description: data.description,
      images: data.images,
      price: Number(data.price),
      stock: Number(data.stock),
    },
  });
}

interface formDataExtract extends Omit<productPayload, "images"> {
  newImages: File[];
  existingImages: string[];
}

export async function extractEditProduct(
  formData: FormData,
): Promise<formDataExtract> {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string | undefined;
  const categoryId = formData.get("categoryId") as string;
  const price = formData.get("price") as string;
  const existingImages: string[] = [];
  const stock = formData.get("stock") as unknown as number;
  const newImages: File[] = [];

  formData.forEach((value, key) => {
    if (key.startsWith("existingImage")) {
      existingImages.push(value as string);
    } else if (key.startsWith("newImage")) {
      newImages.push(value as File);
    }
  });

  return {
    name,
    description,
    categoryId,
    price,
    newImages,
    existingImages,
    stock,
  };
}

export async function extractNewProduct(
  formData: FormData,
): Promise<productPayload> {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string | undefined;
  const categoryId = formData.get("categoryId") as string;
  const price = formData.get("price") as string;
  const stock = formData.get("stock") as unknown as number
  const images: Blob[] = [];

  formData.forEach((value, key) => {
    if (key.startsWith("image") && value instanceof Blob) {
      images.push(value);
    }
  });

  return { name, description, categoryId, price, images, stock };
}

export async function getProductById(
  prisma: PrismaClient,
  productId: string,
): Promise<Product | null> {
  return prisma.product.findFirst({
    where: { id: productId },
    include: {
      Category: true,
      Store: true,
      Wishlist: true,
    },
  });
}

export async function deleteProduct(
  prisma: PrismaClient,
  productId: string,
): Promise<Product | null> {
  return prisma.product.delete({
    where: {
      id: productId,
    },
  });
}
interface searchProductsType {
  products:
  | ProductsResponse[]
  | { category: string; products: ProductsResponse[] };
}

export async function mainSearch(
  prisma: PrismaClient,
  params: searchQueryPayload,
): Promise<searchProductsType | searchProductsType[]> {
  const {
    query = "",
    page = 1,
    limit = 10,
    sortOrder = "desc",
    format = "",
  } = params;
  const includeRelations =
    format !== "simple"
      ? {
        Category: true,
        Store: true,
        Wishlist: true,
      }
      : {
        Category: true,
        Store: true,
      };
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    include: includeRelations,
    orderBy: {
      createdAt: sortOrder,
    },
    take: limit,
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/category`,
    {
      method: "GET",
    },
  );

  const categories: { categories: Category[] } = await res.json();
  const productsByCategory = categories?.categories.map((category) => ({
    category: category.name,
    products: products.filter((product) => product.categoryId === category.id),
  }));
  return format === "simple" ? productsByCategory : { products };
}

export async function productsSellerSearch(
  prisma: PrismaClient,
  storeId: string,
  params: searchQueryPayload,
): Promise<{ products: ProductsResponse[]; total: number }> {
  const { query = "", page = 1, limit = 10 } = params;
  const skip = (page - 1) * limit;

  const where: Prisma.ProductWhereInput = {
    storeId: storeId,
    name: {
      contains: query,
      mode: "insensitive",
    },
  };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        Category: true,
        Store: true,
        Wishlist: true,
      },
      skip,
      take: limit,
    }),
    prisma.product.count({ where }),
  ]);

  return { products, total };
}
