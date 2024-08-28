import type { orderType } from "@/app/(dashboard)/seller/dashboard/store/orders/component/popover-details-order";
import type { ORDER_STATUS, Order, OrderItem } from "@prisma/client";
import { useCallback } from "react";
import type { ProductCat } from "./productsApi";

export const fetchStoreOrders = async ({
  storeId,
  status,
}: {
  storeId: string;
  status?: ORDER_STATUS | undefined;
}): Promise<
  | {
    store: {
      orders: OrderResponse[];
      total: number;
    };
  }
  | undefined
> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/store/${storeId}/orders${status ? `?status=${status}` : ""}`,
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch products ${error}`);
  }
};
type searchQueryPayload = {
  query: string;
  format?: "simple" | "detailed";
  limit?: number;
  page?: number;
  sortOrder?: "asc" | "desc";
};
export const fetchOrdersBySearch = async (
  storeId: string,
  query: searchQueryPayload,
): Promise<
  { data: { orders: OrderResponse[]; total: number } } | undefined
> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/store/${storeId}/orders/search?query=${query.query || ""}&limit=${query.limit || 10}&page=${query.page || 1}&sortOrder=${query.sortOrder || "desc"}`,
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      },
    );
    const data: { data: { orders: OrderResponse[]; total: number } } =
      await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch products ${error}`);
  }
};

export const fetchUserOrders = async ({
  userId,
  status,
}: {
  userId: string;
  status?: ORDER_STATUS | undefined;
}): Promise<
  | {
    data: {
      orders: UserOrderResponse[];
      total: number;
    };
  }
  | undefined
> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/${userId}/order${status ? `?status=${status}` : ""}`,
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch products ${error}`);
  }
};

export interface OrderResponse extends OrderItem {
  order: Order;
  product: ProductCat;
}

interface ProductOrder extends OrderItem {
  product: ProductCat;
}
export interface UserOrderResponse extends Order {
  orderItems: ProductOrder[];
}

export const fetchOrderById = async (
  orderId: string,
): Promise<{ order: orderType }> => {

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/order/${orderId}`,
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      },
    );
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error("Failed fetch order details");
  }
};

export const fetchCustomerOrdersSearch = async ({
  userId,
  status,
  query,
}: {
  userId: string;
  query: string;
  status?: ORDER_STATUS | undefined;
}): Promise<
  | {
    data: {
      orders: UserOrderResponse[];
      total: number;
    };
  }
  | undefined
> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/${userId}/order/search?query=${query}${status ? `&status=${status}` : ""}`,
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch products ${error}`);
  }
};
