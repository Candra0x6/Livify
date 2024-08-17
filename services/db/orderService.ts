import type { orderQueryPayload } from "@/lib/validators/orderSchema";
import { AppError } from "@/utils/api/apiErrors";
import type {
  ORDER_STATUS,
  Order,
  OrderItem,
  Prisma,
  PrismaClient,
} from "@prisma/client";
import type { ProductsParams } from "./productService";
import { searchQueryPayload } from "@/lib/validators/searchParamsSchema";

interface OrdersParams extends ProductsParams {
  status: ORDER_STATUS;
}
interface updateOrderStatus {
  orderId: string;
  action: "confirm" | "reject";
  storeId: string;
}

interface cancleOrder {
  orderId: string;
  status: ORDER_STATUS;
  userId: string;
}
export async function sellerOrderStatus(
  prisma: PrismaClient,
  data: updateOrderStatus,
): Promise<{ order: Order }> {
  return await prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: {
        id: data.orderId,
      },
      include: {
        orderItems: true,
      },
    });

    if (!order) {
      throw new AppError(404, "Order not found");
    }

    const sellerOrderItems = order.orderItems.filter(
      (item) => item.storeId === data.storeId,
    );

    if (sellerOrderItems.length === 0) {
      throw new AppError(403, "No authorized products found for this action");
    }

    const newStatus: ORDER_STATUS =
      data.action === "confirm" ? "PROCESSING" : "REJECTED";

    const updateOrder = await prisma.order.update({
      where: {
        id: data.orderId,
      },
      data: {
        status: newStatus,
      },
    });

    return { order: updateOrder };
  });
}

export async function updateStatus(
  prisma: PrismaClient,
  data: cancleOrder,
): Promise<Order> {
  const order = await prisma.order.findUnique({
    where: {
      id: data.orderId,
      userId: data.userId,
    },
  });

  if (!order) {
    throw new AppError(404, "Order not found");
  }
  const regex = /CANCELLED|COMPLETED|PROCESSING|REJECTED/;
  if (regex.test(order.status)) {
    throw new AppError(
      400,
      `Order already ${order.status.toLowerCase()}. Changes are not allowed.`,
    );
  }
  const updateOrder = await prisma.order.update({
    where: {
      id: data.orderId,
    },
    data: {
      status: data.status,
    },
  });
  return updateOrder;
}

export async function getUserOrders(
  prisma: PrismaClient,
  userId: string,
  params: orderQueryPayload,
): Promise<{ orders: Order[]; total: number }> {
  const {
    page = 1,
    limit = 10,
    categoryId,
    sortBy = "createdAt",
    sortOrder,
    status,
  } = params;

  const skip = (page - 1) * limit;

  let where: Prisma.OrderWhereInput = {
    userId: userId,
  };

  if (status) {
    where = {
      status: status,
    };
  }

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      include: {
        orderItems: {
          include: {
            product: {
              include: {
                Category: true,
              },
            },
          },
        },
      },
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    }),
    prisma.order.count({ where }),
  ]);
  return { orders, total };
}

export async function getOrderById(
  prisma: PrismaClient,
  orderId: string,
): Promise<Order | null> {
  const order = await prisma.order.findFirst({
    where: { id: orderId },
    include: {
      orderItems: {
        include: {
          product: {
            include: {
              Category: true,
            },
          },
        },
      },
    },
  });

  return order;
}

export async function ordersSellerSearch(
  prisma: PrismaClient,
  storeId: string,
  params: searchQueryPayload,
): Promise<{ orders: OrderItem[]; total: number }> {
  const { page = 1, limit = 10, query } = params;
  const skip = (page - 1) * limit;

  const where: Prisma.OrderItemWhereInput = {
    storeId: storeId,
    product: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
  };

  const [orders, total] = await Promise.all([
    prisma.orderItem.findMany({
      where,
      include: {
        product: {
          include: {
            Category: true,
          },
        },
        order: {
          select: {
            id: true,
            createdAt: true,
            orderAddress: true,
            totalPrice: true,
            status: true,
            updatedAt: true,
          },
        },
      },
      skip,
      take: limit,
    }),
    prisma.orderItem.count({ where }),
  ]);

  return { orders, total };
}

export async function ordersCustomerSearch(
  prisma: PrismaClient,
  userId: string,
  params: orderQueryPayload,
): Promise<{ orders: Order[]; total: number }> {
  const {
    page = 1,
    limit = 10,
    categoryId,
    sortBy = "createdAt",
    sortOrder,
    status,
    query,
  } = params;

  const skip = (page - 1) * limit;

  const where: Prisma.OrderWhereInput = {
    userId: userId,
    ...(status && { status: status as ORDER_STATUS }),
    orderItems: {
      some: {
        product: {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
      },
    },
  };

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      include: {
        orderItems: {
          include: {
            product: {
              include: {
                Category: true,
              },
            },
          },
        },
      },
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    }),
    prisma.order.count({ where }),
  ]);
  return { orders, total };
}
