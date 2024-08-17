import type { cartBody } from "@/app/api/v1/cart/new/route";
import { AppError } from "@/utils/api/apiErrors";
import type {
  Cart,
  CartItem,
  Prisma,
  PrismaClient,
  Product,
} from "@prisma/client";
import type { ProductCat } from "../api/productsApi";

interface CartProduct extends CartItem {
  product: ProductCat;
}
interface CartResponse extends Cart {
  items: CartProduct[];
}
export async function getUserCart(
  prisma: PrismaClient,
  userId: string,
): Promise<{ data: CartItem[] }> {
  const cart = await prisma.cartItem.findMany({
    where: { cart: { userId } },
    include: {
      product: {
        include: {
          Category: true
        }
      },
      cart: {
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          _count: true
        }
      }
    }
  });

  return { data: cart };
}
interface AddToCartInput extends cartBody {
  userId: string;
}

interface CartResult {
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  cart: Prisma.CartGetPayload<{}>;
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  cartItem: Prisma.CartItemGetPayload<{}>;
}

export async function addToCart(
  prisma: PrismaClient,
  input: AddToCartInput,
): Promise<CartResult> {
  const { productId, quantity, storeId, userId } = input;

  if (quantity <= 0) {
    throw new AppError(400, "Quantity must be greater than zero");
  }

  return prisma.$transaction(async (tx) => {
    await findAndValidateProduct(tx, productId, quantity);
    const cart = await getOrCreateCart(tx, userId);
    const cartItem = await updateOrCreateCartItem(
      tx,
      cart.id,
      productId,
      storeId,
    );
    // await updateProductStock(tx, productId, quantity)

    return { cart, cartItem };
  });
}

async function findAndValidateProduct(
  tx: Prisma.TransactionClient,
  productId: string,
  quantity: number,
): Promise<Prisma.ProductGetPayload<{ select: { id: true; stock: true } }>> {
  const product = await tx.product.findUnique({
    where: { id: productId },
    select: { id: true, stock: true },
  });

  if (!product) {
    throw new AppError(404, "Product not found");
  }

  if (product.stock < quantity) {
    throw new AppError(401, "Insufficient stock");
  }

  return product;
}

async function getOrCreateCart(
  tx: Prisma.TransactionClient,
  userId: string,
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
): Promise<Prisma.CartGetPayload<{}>> {
  let cart = await tx.cart.findFirst({ where: { userId } });

  if (!cart) {
    cart = await tx.cart.create({ data: { userId } });
  }

  return cart;
}

async function updateOrCreateCartItem(
  tx: Prisma.TransactionClient,
  cartId: string,
  productId: string,
  storeId: string,
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
): Promise<Prisma.CartItemGetPayload<{}>> {
  const existingCartItem = await tx.cartItem.findFirst({
    where: { cartId, productId },
  });

  if (existingCartItem) {
    return tx.cartItem.update({
      where: { id: existingCartItem.id },
      data: { quantity: { increment: 1 } },
    });
  }

  return tx.cartItem.create({
    data: { cartId, productId, storeId, quantity: 1 },
  });
}

async function updateProductStock(
  tx: Prisma.TransactionClient,
  productId: string,
  quantity: number,
): Promise<void> {
  await tx.product.update({
    where: { id: productId },
    data: { stock: { decrement: quantity } },
  });
}
interface updateCartPayload {
  cartItemId: string;
  userId: string;
}

interface deleteCartPayload {
  cartId: string;
  userId: string;
}

export async function decrementCart(
  prisma: PrismaClient,
  data: updateCartPayload,
): Promise<CartItem> {
  const cart = await prisma.cartItem.update({
    where: { cart: { userId: data.userId }, id: data.cartItemId },
    data: {
      quantity: {
        decrement: 1,
      },
    },
  });
  return cart;
}

export async function incrementCart(
  prisma: PrismaClient,
  data: updateCartPayload,
): Promise<CartItem> {
  const cart = await prisma.cartItem.update({
    where: { cart: { userId: data.userId }, id: data.cartItemId },
    data: {
      quantity: {
        increment: 1,
      },
    },
  });
  return cart;
}

export async function deleteCartItem(
  prisma: PrismaClient,
  data: updateCartPayload,
): Promise<void> {

  await prisma.cartItem.delete({
    where: { cart: { userId: data.userId }, id: data.cartItemId },
  });
}

export async function deleteCart(
  prisma: PrismaClient,
  data: deleteCartPayload,
): Promise<void> {
  await prisma.cartItem.deleteMany({
    where: { cart: { userId: data.userId }, cartId: data.cartId },
  });
  await prisma.cart.delete({
    where: { userId: data.userId, id: data.cartId },
  });
}
