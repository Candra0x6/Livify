"use client";

import { MarqueeVertical } from "@/components/ReviewShow";
import SectionHeader from "@/components/SectionHeader";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { ProductCard } from "@/components/cards/ProductCard";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import DotPattern from "@/components/magicui/dot-pattern";
import { CategorySkeletonCard } from "@/components/skeletons/CategorySkeletonCard";
import ProductGridSkeletonCard from "@/components/skeletons/ProductGridSkeletonCard";
import { cn } from "@/lib/utils";
import {
  type ProductsResponse,
  fetchCategory,
  fetchProducts,
} from "@/services/api/productsApi";
import type { Category, Product } from "@prisma/client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowRightLong, FaGithub, FaStar } from "react-icons/fa6";

export default function RootPage() {
  const [category, setcategory] = useState<{ categories: Category[] }>();
  const [products, setProducts] = useState<ProductsResponse[] | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const productsPromise = fetchProducts({
          limit: 10,
          categoryId: "",
        });
        const categoryPromise = fetchCategory();

        const [productsData, categoryData] = await Promise.all([
          productsPromise,
          categoryPromise,
        ]);
        setProducts(productsData);
        setcategory(categoryData);
      } catch (err) {
        setLoading(true);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="container mx-auto">
      <section className="bg-gradient-to-b from-transparent to-background items-center relative overflow-hidden">
        <DotPattern
          className={cn("[mask-image:radial-gradient(white,transparent)]")}
        />
        <div className="z-10">
          <div className="md:flex relative min-h-[90vh]">
            <div className="md:max-w-[70%] w-full flex flex-col mt-32 mb-10 ml-1">
              <div className="z-10 flex">
                <AnimatedGradientText>
                  <FaGithub />
                  <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />
                  <span
                    className={cn(
                      "inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent",
                    )}
                  >
                    Github Repo
                  </span>
                  <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                </AnimatedGradientText>
              </div>
              <h1 className="font-bold xl:text-[3.4rem] text-[2.5rem] bg-gradient-to-br from-foreground via-foreground to-background bg-clip-text text-transparent leading-[1.2]">
                Open source platform furniture e-commerce built by CN
              </h1>
              <span className="text-textSecondary">
                Build your own furniture store with easy transaction via online
                on this platform.
              </span>
              <Link href="/wishlist" className="w-[10rem] mt-5 group">
                Get Started
                <FaArrowRightLong className="transition-all duration-500 group-hover:translate-x-2 ease-in-out" />
              </Link>
            </div>
            <div className="md:max-w-[40%] md:min-w-[30%] w-full h-full flex items-start relative">
              <MarqueeVertical />
            </div>
          </div>
        </div>
      </section>
      <section id="#category">
        <SectionHeader
          title="Explore Category"
          description="Find the perfect product effortlessly."
          navigate="See All Category"
          href="/products"
        />
        <div className="grid lg:grid-cols-5 sm:grid-cols-4 grid-cols-3 sm:gap-5 gap-2">
          {loading ? (
            <CategorySkeletonCard />
          ) : (
            category &&
            category?.categories?.length > 0 &&
            category?.categories?.map((item) => (
              <CategoryCard key={item.id} data={item} />
            ))
          )}
        </div>
      </section>
      <section className="mt-36">
        <SectionHeader
          title="Just For You"
          description="Save big on top items."
          navigate="See All Products"
        />
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 md:gap-3 grid-cols-2 mt-12 xl:gap-6 gap-2">
          {products &&
            products.length > 0 &&
            products.map((item) => <ProductCard key={item.id} data={item} />)}
        </div>
      </section>
      <section className="mt-36">
        <SectionHeader
          title="Trending Product"
          description="Best product worth to buy."
          navigate="See All Products"
        />
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 md:gap-3 grid-cols-2 mt-12 xl:gap-6 gap-2">
          {loading ? (
            <ProductGridSkeletonCard />
          ) : (
            products &&
            products.length > 0 &&
            products.map((item) => <ProductCard key={item.id} data={item} />)
          )}
        </div>
      </section>
    </div>
  );
}
