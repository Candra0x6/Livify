"use client";
import { ProductCard } from "@/components/cards/ProductCard";
import CheckoutForm from "@/components/forms/CheckOutForm";
import { ProductDetailSkeletonCard } from "@/components/skeletons/ProductDetailCard";
import ProductGridSkeletonCard from "@/components/skeletons/ProductGridSkeletonCard";
import { Button } from "@/components/ui/button";
import Flex from "@/components/ui/flex";
import Grid from "@/components/ui/grid";
import { Heading } from "@/components/ui/heading";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import { useOrderAction } from "@/hooks/useOrderAction";
import usePayment from "@/hooks/usePayment";
import { useProductActions } from "@/hooks/useProductAction";
import { formatPrice } from "@/lib/utils";
import {
  type ProductsResponse,
  fetchProductById,
  fetchRecommendationProducts,
} from "@/services/api/productsApi";
import type { Product } from "@prisma/client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import type React from "react";
import { type ReactNode, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { MdOutlineShoppingBag } from "react-icons/md";
import CartIcon from "../../../../../public/icons/cart.svg";
import { PaymentDialog } from "./component/payment-dialog";
export interface productBody {
  productId: string | undefined;
  price: number | undefined;
  quantity: number | undefined;
  storeId: string | undefined;
}
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);
export default function ProductDetails() {
  const url = useSearchParams();
  const statusPayment = url.get("redirect_status");
  const { createOrder } = useOrderAction();
  const { addCart } = useProductActions();
  const { handlePayment } = usePayment();
  const params = useSearchParams();
  const productId = params.get("productId");
  const [data, setData] = useState<ProductsResponse | undefined>();
  const [products, setProducts] = useState<ProductsResponse[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const productsPromise = await fetchProductById(productId as string);
        const recommendationProductsPromise = await fetchRecommendationProducts(
          productId as string,
          {
            limit: 10,
          }
        );
        const [productsData, recommendationData] = await Promise.all([
          productsPromise,
          recommendationProductsPromise,
        ]);

        setData(productsData?.product);
        setProducts(recommendationData);
      } catch (err) {
        setLoading(true);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [productId]);

  const handleOrder = async () => {
    try {
      const prodcut = [data];
      const productBodies: productBody[] | undefined = prodcut?.map((item) => ({
        productId: item?.id,
        price: item?.price as unknown as number,
        quantity: 1,
        storeId: item?.storeId,
      }));

      await createOrder(productBodies, "SOLO");
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Failed to place order. Please try again.");
    }
  };
  if (statusPayment === "succeeded") {
    handleOrder();
  }

  const appearance: { theme: "stripe" } = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return loading ? (
    <div className="container space-y-10">
      <ProductDetailSkeletonCard />
      <div className="xl:grid-cols-5 grid lg:grid-cols-4 sm:grid-cols-3 md:gap-3 grid-cols-2 mt-12 xl:gap-6 gap-2">
        <ProductGridSkeletonCard />
      </div>
    </div>
  ) : (
    data && (
      <div className="container mx-auto mt-40">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <PaymentDialog
              isOpen={clientSecret}
              setIsOpen={setClientSecret}
              data={data}
            />
          </Elements>
        )}
        <div className="bg-white rounded-lg shadow-sh-card mt-32 w-full">
          <Grid className="p-10 md:grid-cols-2 grid-rows-1 grid-cols-1 gap-10">
            <Flex direction="column" gap={20}>
              <div className="">
                <img
                  loading="lazy"
                  // @ts-ignore
                  src={data.images[0]}
                  alt={data.name}
                  className="w-full h-full aspect-square bg-[#F6F7FB] rounded-lg"
                />
              </div>
              <Grid columns={3} rows={1} className="" rowGap={30}>
                {data?.images &&
                  // @ts-ignore
                  data?.images?.length > 0 &&
                  // @ts-ignore
                  data?.images?.map(
                    (item: string, i: React.Key | null | undefined) => (
                      <img
                        loading="lazy"
                        src={item as string}
                        // biome-ignore lint/suspicious/noArrayIndexKey: <>
                        key={i}
                        alt={`product${i}`}
                        className="w-full h-full aspect-square bg-[#F6F7FB]  object-cover rounded-lg"
                      />
                    )
                  )}
              </Grid>
            </Flex>
            <Flex direction="column" className="space-y-6 max-h-[500px]">
              <Flex direction="column">
                <h1 className="text-[40px] font-medium">{data?.name}</h1>
                <span className="text-textSecondary">{data.description}</span>
                <Text className="font-semibold mt-3 text-[1.7rem] text-primary">
                  {/*@ts-ignore*/}
                  {formatPrice(Number.parseFloat(data.price))}
                </Text>
                <div className="flex text-yellow-400 items-center ">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <span className="text-foreground underline ml-5">
                    2122 Reviews
                  </span>
                </div>
              </Flex>
              <Flex direction="column">
                <Text className="font-JosefinRegular text-xl text-primarytext">
                  Choose Color
                </Text>
                <Flex gap={10}>
                  <div className="bg-red aspect-square w-7 rounded-full" />
                  <div className="bg-orange-600 aspect-square w-7 rounded-full" />
                  <div className="bg-lime-600 aspect-square w-7 rounded-full" />
                </Flex>
              </Flex>

              <Flex gap={20} className="pt-5">
                <Button
                  onClick={async () => {
                    const payment = await handlePayment(
                      data?.price as unknown as number
                    );
                    setClientSecret(payment);
                  }}
                  className=" px-14 flex items-center gap-x-1 "
                >
                  <Text className="text-white text-md  ">Buy</Text>
                  <MdOutlineShoppingBag className="text-white text-2xl" />
                </Button>
                <Button
                  onClick={() =>
                    addCart({
                      productId: data.id,
                      storeId: data.storeId,
                      quantity: 1,
                    })
                  }
                  className=" px-8 flex items-center gap-x-1"
                >
                  <Text className="text-white text-md  ">Add to Cart</Text>
                  <Image
                    src={CartIcon}
                    alt="cart-icon"
                    className="w-7 aspect-square"
                  />
                </Button>
              </Flex>
            </Flex>
          </Grid>
        </div>
        <Flex direction="column" className="mt-20">
          <h1 className=" mb-10 font-semibold text-[3rem]">Related Products</h1>
          <Grid
            className=" xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 md:gap-3 grid-cols-2 mt-12 xl:gap-6 gap-2"
            gap={10}
          >
            {products &&
              products.length > 0 &&
              products.map((item) => <ProductCard key={item.id} data={item} />)}
          </Grid>
        </Flex>
      </div>
    )
  );
}
