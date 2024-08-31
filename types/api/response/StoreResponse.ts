import type { OrderItemWithOrder } from "@/interfaces/models/Order";
import type { Pagination } from "@/interfaces/models/Pagination";
import type { ProductDetails } from "@/interfaces/models/Product";
import type { Store } from "@prisma/client";

export interface StoreDetails {
  store: Store
}

export interface StoreProducts {
  store: {
    products: ProductDetails[]
    pagination?: Pagination
  }
}

export interface StoreOrders {
  store: {
    orders: OrderItemWithOrder[]
    total?: number
  }
}