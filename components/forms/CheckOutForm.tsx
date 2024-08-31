import type { productBody } from "@/app/products/(route)/[storeSlug]/[productSlug]/page";
import { useOrderAction } from "@/hooks/useOrderAction";
import type { ProductDetails } from "@/interfaces/models/Product";
import type { Cart } from "@prisma/client";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import type { StripePaymentElementOptions } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

export default function CheckoutForm({
  data,
}: {
  data: ProductDetails | Cart;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const { createOrder } = useOrderAction();
  const [message, setMessage] = useState<null | string>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (error) {
        if (error.type === "card_error" || error.type === "validation_error") {
          setMessage(error.message as string);
        } else {
          setMessage("An unexpected error occurred.");
        }
        setIsLoading(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
        try {
          const products = Array.isArray(data) ? data : [data];
          const productBodies: productBody[] | undefined = products?.map(
            (item) => ({
              productId: item.productId || item?.id,
              price: item?.price || (item.product.price as unknown as number),
              quantity: item.quantity || 1,
              storeId: item?.storeId,
            })
          );

          const order = await createOrder(productBodies, "SOLO");
          if (order) {
            window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/payment-confirmation?orderId=${order?.data?.order?.id}&currency=${paymentIntent.currency}&amount=${paymentIntent.amount}&status=${paymentIntent.status}`;
          }
        } catch (error) {
          console.error("Checkout failed:", error);
          setMessage("Failed to place order. Please try again.");
        }
      } else {
        setMessage("Payment was not successful. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred during payment confirmation:", error);
      setMessage("An error occurred. Please try again.");
    }

    setIsLoading(false);
  };
  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <Button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="w-full mt-5"
      >
        {isLoading ? (
          <div className="spinner" id="spinner">
            ⏳ Processing Payment...
          </div>
        ) : (
          "💳 Confirm Payment"
        )}
      </Button>
      {/* Show any error or success messages */}
      {message && (
        <div id="payment-message" className="text-destructive-foreground">
          {message}
        </div>
      )}
    </form>
  );
}
