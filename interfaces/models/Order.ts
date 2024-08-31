import type { Order, OrderItem, Product } from "@prisma/client";
import type { ProductDetails } from "./Product";

export interface OrderItemWithProduct extends OrderItem {
  product: ProductDetails
}
export interface OrderWithItems extends Order {
  orderItems: OrderItemWithProduct[]
  total?: number
}

export interface OrderItemWithOrder extends OrderItemWithProduct {
  order: Order
}