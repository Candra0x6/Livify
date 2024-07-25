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

export async function getStoreById(
  prisma: PrismaClient,
  storeId: string,
): Promise<Store | null> {
  return prisma.store.findFirst({
    where: { id: storeId },
  });
}

export async function getStoreOrders(
  prisma: PrismaClient,
  storeId: string,
  status?: ORDER_STATUS,
  params: ProductsParams = {}
): Promise<{ orders: OrderItem[]; total: number }> {
  const {
    page = 1,
    limit = 10,
    categoryId,
  } = params;

  const skip = (page - 1) * limit;

  const where: Prisma.OrderItemWhereInput = {
    storeId: storeId,

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
            status: true
          }
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
  return prisma.store.delete({
    where: {
      id: storeId,
    },
  });
}
