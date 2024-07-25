import { AppError } from "@/utils/api/apiErrors";
import type { ORDER_STATUS, Order, OrderItem, Prisma, PrismaClient } from "@prisma/client";
import type { ProductsParams } from "./productService";

interface OrdersParams extends ProductsParams {
  status: ORDER_STATUS
}
interface updateOrderStatus {
  orderId: string
  action: "confirm" | "reject"
  storeId: string
}

interface cancleOrder {
  orderId: string
  status: ORDER_STATUS
  userId: string
}
export async function sellerOrderStatus(
  prisma: PrismaClient,
  data: updateOrderStatus
): Promise<{ order: Order; }> {
  // Menggunakan transaksi untuk menjaga konsistensi data
  return await prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: {
        id: data.orderId,
      },
      include: {
        orderItems: true
      }
    });

    if (!order) {
      throw new AppError(404, "Order not found");
    }

    const sellerOrderItems = order.orderItems.filter(item =>
      item.storeId === data.storeId
    );

    if (sellerOrderItems.length === 0) {
      throw new AppError(403, "No authorized products found for this action");
    }

    const newStatus: ORDER_STATUS = data.action === 'confirm' ? "PROCESSING" : "REJECTED";

    const updateOrder = await prisma.order.update({
      where: {
        id: data.orderId
      },
      data: {
        status: newStatus
      }
    })




    return { order: updateOrder };
  });
}

export async function cancleOrder(prisma: PrismaClient,
  data: cancleOrder
): Promise<Order> {
  const order = await prisma.order.findUnique({
    where: {
      id: data.orderId,
      userId: data.userId
    }
  })

  if (!order) {
    throw new AppError(404, "Order not found")
  }
  if (order?.status === "PROCESSING") {
    throw new AppError(400, "Order cannot be cancelled")
  }
  const updateOrder = await prisma.order.update({
    where: {
      id: data.orderId
    },
    data: {
      status: data.status
    }
  })
  return updateOrder
}

export async function getUserOrders(
  prisma: PrismaClient,
  userId: string,
  params: OrdersParams = {
    status: "PENDING"
  }
): Promise<{ orders: Order[]; total: number }> {
  const {
    page = 1,
    limit = 10,
    categoryId,
    sortBy = "createdAt",
    sortOrder
  } = params;

  const skip = (page - 1) * limit;

  const where: Prisma.OrderWhereInput = {
    status: params.status,
    userId,
  };

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      include: {
        orderItems: true
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
): Promise<{ orders: Order | null }> {
  const order = await prisma.order.findFirst({
    where: { id: orderId },
    include: {
      orderItems: true
    }
  });

  return { orders: order }
}