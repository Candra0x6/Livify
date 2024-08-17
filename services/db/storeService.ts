import type { storePayload } from "@/lib/validators/storeSchema";
import type {
  ORDER_STATUS,
  Order,
  OrderItem,
  Prisma,
  PrismaClient,
  Store,
} from "@prisma/client";
import type { ProductsParams } from "./productService";
import { searchQueryPayload } from "@/lib/validators/searchParamsSchema";
import { orderQueryPayload } from "@/lib/validators/orderSchema";

export async function getStoreById(
  prisma: PrismaClient,
  storeId: string,
): Promise<Store | null> {
  return prisma.store.findFirst({
    where: { id: storeId },
  });
}

interface OrdersParams extends ProductsParams {
  status?: ORDER_STATUS;
}
export async function getStoreOrders(
  prisma: PrismaClient,
  storeId: string,
  params: orderQueryPayload,
): Promise<{ orders: OrderItem[]; total: number }> {
  const { page = 1, limit = 10, query = "", status } = params;
  const skip = (page - 1) * limit;

  const where: Prisma.OrderItemWhereInput = {
    storeId: storeId,
    product: {
      name: {
        contains: query,
      },
    },
    order: {
      // @ts-ignore
      status,
    },
  };

  const [orders, total] = await Promise.all([
    prisma.orderItem.findMany({
      where,
      include: {
        product: true,
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

interface storeType extends storePayload {
  storeId: string;
  userId: string;
}

export async function updateStore(
  prisma: PrismaClient,
  data: storeType,
): Promise<Store | null> {
  return prisma.store.update({
    where: {
      id: data.storeId,
      userId: data.userId,
    },
    data: {
      name: data.name,
      description: data.description,
      image: data.image,
    },
  });
}

export async function deleteStore(
  prisma: PrismaClient,
  storeId: string,
): Promise<Store | null> {
  return prisma.$transaction(async (tx) => {
    await tx.orderItem.deleteMany({ where: { storeId } });
    await tx.cartItem.deleteMany({ where: { storeId } });
    await tx.product.deleteMany({ where: { storeId } });
    await tx.orderItem.deleteMany({ where: { storeId } });
    await tx.order.deleteMany({
      where: {
        orderItems: {
          every: {
            storeId,
          },
        },
      },
    });
    await tx.session.updateMany({
      where: { storeId },
      data: {
        storeId: null,
      },
    });
    await tx.wishlist.deleteMany({ where: { storeId } });
    return tx.store.delete({
      where: { id: storeId },
    });
  });
}
