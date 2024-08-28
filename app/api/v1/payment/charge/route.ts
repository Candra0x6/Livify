import { stripe } from "@/lib/utils";
import { errorHandler } from "@/middleware";
import { ApiResponse } from "@/utils/api/apiResponse";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log(body)
    const amount = Math.round(body.amount * 100)
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    return ApiResponse.success(
      {
        paymentIntent
      },
      200
    )
  } catch (error) {
    return errorHandler(error);

  }
}