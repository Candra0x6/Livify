import type { Category, Product, Store, Wishlist } from "@prisma/client";

export interface ProductDetails extends Product {
  Category: Category
  Store: Store
  Wishlist?: Wishlist
}

