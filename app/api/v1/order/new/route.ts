import type { productBody } from "@/app/products/(route)/[storeSlug]/[productSlug]/page";
import { getSession } from "@/lib/auth/auth";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await getSession();
    const {
      orderItems,
      orderAddress,
    }: { orderItems: productBody[]; orderAddress: string } =
      await request.json();
    console.log(orderItems);
    if (!session?.userId || typeof session.userId !== "string") {
      return NextResponse.json(
        { message: "Valid User ID is required" },
        { status: 400 },
      );
    }

    if (!Array.isArray(orderItems) || orderItems.length === 0) {
      return NextResponse.json(
        {
          message: "Invalid Data: orderItems must be a non-empty array",
        },
        {
          status: 400,
        },
      );
    }

    const totalPrice = orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
    const createOrder = await prisma.order.create({
      data: {
        orderAddress,
        status: "PENDING",
        totalPrice,
        userId: session.userId,
      },
    });

    const createdOrderItems = await prisma.orderItem.createMany({
      data: orderItems.map((item) => ({
        price: item.price,
        quantity: item.quantity,
        orderId: createOrder.id,
        productId: item.productId,
        storeId: item.storeId,
      })),
    });

    const response = NextResponse.json(
      {
        message: "Successfully Make Order",
        data: {
          order: {
            id: createOrder.id,
            totalPrice: createOrder.totalPrice,
            status: createOrder.status,
            orderAddress: createOrder.orderAddress,
          },
          orderItemsCount: createdOrderItems.count,
        },
      },
      { status: 200, statusText: "Success Create Order" },
    );
    return response;
  } catch (error) {
    console.error("Error creating order:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { message: "Database error", code: error.code },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { message: "Unable to create order", code: error },
      { status: 500 },
    );
  }
}
