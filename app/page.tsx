"use client";
import InfiniteSlider from "@/components/InfinitySilder";
import SectionHeader from "@/components/SectionHeader";
import { ProductCard } from "@/components/cards/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Product } from "@prisma/client";
import { Bed, Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaArrowRightLong, FaStar } from "react-icons/fa6";
import tes from "../public/icons/TUserIcon.svg";
import tes2 from "../public/images/sofa-chair.png";
import dots from "../public/svg/patternn.svg";

export default function RootPage() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/product`,
        {
          method: "GET",
        }
      );
      const data = await res.json();

      setProducts(data.products);
    };

    getProducts();
  }, []);
  return (
    <div className="container mx-auto">
      <section className="bg-gradient-to-b from-transparent to-background items-center relative ">
        <div
          className="absolute opacity-20"
          style={{
            backgroundImage: "radial-gradient(#000000 1px, transparent 1px)",
            backgroundSize: "var(--dot-spacing) var(--dot-spacing)",
            "--dot-spacing": "20px",
            "--dot-size": "30px",
            width: "var(--dots-width)",
            height: "var(--dots-height)",
            "--dots-width": "100vh",
            "--dots-height": "500px",
          }}
        />{" "}
        <div className="z-10">
          <div className="flex relative min-h-[90vh]">
            <div className="max-w-[70%] flex flex-col mt-32 ">
              <h1 className="font-bold text-[3.4rem] bg-gradient-to-br from-foreground via-foreground to-background bg-clip-text text-transparent leading-[1.2]">
                Open source platform furniture e-commerce built by CN
              </h1>
              <span className="text-textSecondary">
                Build your own furniture store with easy transaction via online
                on this platform.
              </span>
              <Button className="w-[10rem] mt-5 group">
                Get Started
                <FaArrowRightLong className="transition-all duration-500 group-hover:translate-x-2 ease-in-out" />
              </Button>
            </div>
            <div className="max-w-[40%] min-w-[30%] overflow-hidden flex items-start relative">
              <div className="z-0">
                <InfiniteSlider rtl={false} />
              </div>
              <div className=" z-0">
                <InfiniteSlider rtl={true} />
              </div>
            </div>
            <div
              className="absolute inset-x-0 bottom-0 h-1/2 z-10 bg-gradient-to-b from-transparent via-background
           to-background "
            />
          </div>
        </div>
      </section>
      <section className="">
        <SectionHeader
          title="Explore Category"
          description="Find the perfect product effortlessly."
          navigate="See All Category"
        />
        <div className="grid grid-cols-4 gap-x-6">
          <Card className="relative flex h-[8rem] w-full overflow-hidden rounded-lg shadow-lg border hover:shadow-2xl transition-all duration-300 group p-4 bg-white hover:bg-meta ">
            <CardHeader>
              <Image src={tes} alt="category" className="w-20 " />
            </CardHeader>
            <CardContent className="space-y-1.5">
              <CardTitle className="capitalize text-primary font-semibold text-2xl ">
                aok
              </CardTitle>
              <CardDescription className="">Show bed category</CardDescription>
            </CardContent>
          </Card>
          <Card className="relative flex h-[8rem] w-full overflow-hidden rounded-lg bg-transition-colors group hover:bg-primary p-4 ">
            <CardHeader>
              <Image src={tes} alt="category" className="w-20 " />
            </CardHeader>
            <CardContent className="space-y-1.5">
              <CardTitle className="capitalize text-primary font-semibold text-2xl ">
                aok
              </CardTitle>
              <CardDescription className="">Show bed category</CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>
      <section className="mt-36">
        <SectionHeader
          title="Today's Hot Deals"
          description="Save big on top items."
          navigate="See All Products"
        />
        <div className="grid grid-cols-4 mt-12 gap-6">
          {products &&
            products.length > 0 &&
            products.map((item, i) => (
              <ProductCard
                key={i}
                name="Vitae Supandes"
                image={item.images[0]}
                price={30.212}
                color={[""]}
                description="Lorem ipsum dolor sit amet, consectetur adip non proident et non proident et et et et et et et et et et et et et et et et"
                productId={item.id}
                slug={item.slug}
                storeId={item.storeId}
              />
            ))}
        </div>
      </section>
    </div>
  );
}
