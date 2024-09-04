"use client";
import SectionHeader from "@/components/SectionHeader";
import { CartDetailsCard } from "@/components/cards/CartProductCard";
import CartSummerySkeleton from "@/components/skeletons/CartSummerySkeleton";
import { ProductListSkeletonCard } from "@/components/skeletons/ProductListSkeletonCard";
import { Button } from "@/components/ui/button";
import { useCartAction } from "@/hooks/useCartAction";
import usePayment from "@/hooks/usePayment";
import { AllCartProducts, type CartProducts } from "@/interfaces/models/Cart";
import { getSession } from "@/lib/auth/auth";
import { formatPrice } from "@/lib/utils";
import { fetchCart } from "@/services/api/cartApi";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import EmptyCart from "../../public/svg/empty-cart.png";
import { PaymentDialog } from "../products/(route)/[storeSlug]/[productSlug]/component/payment-dialog";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);
function Cart() {
  const { handlePayment } = usePayment();
  const url = useSearchParams();
  const router = useRouter();
  const [statusPayment, setStatusPayment] = useState<"success" | "failed">();
  const [clientSecret, setClientSecret] = useState("");
  const [cart, setCart] = useState<CartProducts[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const { calculateTotal } = useCartAction({
    cart,
    setCart,
  });

  const handleCheckout = async () => {
    try {
      const session = await getSession();

      if (!session) {
        toast.error("Account required to purchase!");
        router.push("/sign-in");
        return;
      }
      setLoadingButton(true);
      const paymentData = await handlePayment(calculateTotal() as number);

      setClientSecret(paymentData);
    } catch (err) {
      setLoadingButton(true);
      console.error(err);
    } finally {
      setLoadingButton(false);
    }
  };

  useEffect(() => {
    const getCartProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchCart();
        setCart(data.carts);
        localStorage.setItem("cartId", data?.carts[0]?.cartId);
      } catch (err) {
        setLoading(true);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getCartProduct();
  }, []);
  const appearance: { theme: "stripe" } = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div className="container mx-auto mt-36 min-h-screen">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <PaymentDialog
            isOpen={clientSecret}
            setIsOpen={setClientSecret}
            // @ts-ignore
            data={cart}
          />
        </Elements>
      )}
      <SectionHeader title="Cart Products" description="See all your cart" />
      <div className="lg:flex lg:space-x-5 lg:space-y-0 space-y-20 mt-10">
        <div className=" lg:max-w-[60%] sm:w-full">
          <div className="space-y-6 w-full">
            {loading ? (
              <ProductListSkeletonCard />
            ) : (
              (cart &&
                cart.length > 0 &&
                cart.map((item) => (
                  <CartDetailsCard
                    key={item.id}
                    cart={cart}
                    data={item}
                    setCart={setCart}
                  />
                ))) || (
                <div className="w-full flex justify-center">
                  <Image src={EmptyCart} alt="Empty Cart" />{" "}
                </div>
              )
            )}
          </div>
        </div>
        <div className="lg:max-w-[40%] bg-white sm:w-full rounded-xl shadow-sh-card">
          {loading ? (
            <CartSummerySkeleton />
          ) : (
            <div className="w-full h-full flex flex-col p-4 sm:px-6 justify-between">
              <div className="flex flex-col">
                <h1 className="font-semibold text-2xl border-b-[1px] border-accent pb-2">
                  Cart Summery
                </h1>
                <div className="flex w-full justify-between items-center">
                  <h1 className="font-semibold text-xl py-2">Total</h1>
                  <span className="font-semibold text-lg">
                    {/* @ts-expect-error */}
                    {formatPrice(Number.parseFloat(calculateTotal()))}
                  </span>
                </div>
              </div>

              <Button
                variant="default"
                className="rounded-lg w-full place-items-end place-self-end justify-items-end"
                onClick={handleCheckout}
                disabled={loadingButton}
              >
                {loadingButton
                  ? "Preparing Checkout 🏃‍♂️‍➡️"
                  : "Proceed to Checkout"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
