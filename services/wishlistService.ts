import type { Prisma, PrismaClient, Wishlist } from "@prisma/client";
import type { ProductsParams } from "./productService";

interface wishlistPayload {
  userId: string
  productId: string
}

export interface addWishlistPayload extends wishlistPayload {
  storeId: string
}

interface deleteWishlistPayload extends wishlistPayload {
  wishlistId: string
}

export async function getAllWishlist(
  prisma: PrismaClient,
  userId: string,
  params: ProductsParams = {},
): Promise<{ wishlists: Wishlist[]; total: number }> {
  const {
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
    categoryId,
  } = params;

  const skip = (page - 1) * limit;

  const where: Prisma.WishlistWhereInput = categoryId ? { product: { categoryId }, userId } : {};

  const [wishlists, total] = await Promise.all([
    prisma.wishlist.findMany({
      where,
      include: {
        product: true
      },
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    }),
    prisma.wishlist.count({ where }),
  ]);

  return { wishlists, total };
}

export async function addWishlist(prisma: PrismaClient, data: addWishlistPayload): Promise<Wishlist> {
  const wishlist = await prisma.wishlist.create({
    data: {
      userId: data.userId,
      productId: data.productId,
      storeId: data.storeId
    }
  })
  return wishlist
}

export async function deleteWishlist(prisma: PrismaClient, data: deleteWishlistPayload): Promise<Wishlist> {
  const wishlist = await prisma.wishlist.delete({
    where: { userId: data.userId, productId: data.productId, id: data.wishlistId },
  })
  return wishlist
}

export async function validateWishlist(prisma: PrismaClient, data: wishlistPayload): Promise<Wishlist | null> {
  const wishlist = await prisma.user.findFirst({
    where: {
      id: data.userId,
      Wishlist: {
        some: {
          id: data.productId
        }
      }
    },
    include: {
      Wishlist: true
    }
  });

  return wishlist ? wishlist.Wishlist.find(item => item.id === data.productId) || null : null;
}

