import type { Pagination } from "@/interfaces/models/Pagination";
import type { ProductDetails } from "@/interfaces/models/Product";
import type { Category } from "@prisma/client";

export interface AllProducts {
  products: ProductDetails[]
  pagination?: Pagination
}

export interface ProductSearch {
  data: {
    category: string
    products: ProductDetails[]
  }[]
}

export interface ProductDetailsRes {
  product: ProductDetails
}

export interface AllCategories {
  categories: Category[]
}