import type { Cart, CartItem } from "@prisma/client";
import type { ProductDetails } from "./Product";

export interface CartProducts extends CartItem {
  product: ProductDetails
  cart: Cart
}

export interface AllCartProducts {
  carts: CartProducts[]
}