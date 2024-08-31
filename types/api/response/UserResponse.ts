import type { OrderWithItems } from "@/interfaces/models/Order";
import type { StoreValidate } from "@/interfaces/models/Store";
import type { User } from "@prisma/client";

export interface UserDetails {
  data: User
}
export interface UserOrdersDetails {
  orders: OrderWithItems[]
  total?: number
}

export interface UserStoreValidation {
  store: StoreValidate
}

