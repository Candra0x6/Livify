"use server";
import { Button } from "@/components/ui/button";
import shapeDiscount from "./assets/shape-discount.svg";
import shapeProduct from "./assets/shape-main-object.svg";
import mainProduct from "./assets/Shell-Shaped-Armchair-Pink-Velvet-Fabric-One-Seater-Sofa-for-Living-Room 1.svg";
import lamp from "./assets/lamp.png";
import Image from "next/image";
import ContainerLayout from "@/components/layout/ContainerLayout";
import { Heading } from "@/components/ui/heading";
import LatestProductsSection from "@/components/LatestProductsSection";
import FeaturedProductCard from "@/components/cards/FeaturedProductCard";
import ShopOffersSection from "@/components/ShopOffersSection";
import TrendingAdsSection from "@/components/TrendingAdsSection";
import TrendingProductSection from "@/components/TrendingProductSection";
import DiscountItemSection from "@/components/DiscountItemSection";
import SubscribeAdsSection from "@/components/SubscribeAdsSection";
import LatestBlogSection from "@/components/LatestBlogSection";

export default async function Index() {
  const color = ["#08D15F", "#462cf1", "#000000"];
  return (
    <div className="w-full flex mx-auto flex-col items-center relative text-text">
      <main className="w-full relative min-h-screen">
        <div className="absolute left-0 w-[200px]">
          <Image src={lamp} alt="lamp" className="w-full h-full" />
        </div>
        <div className="w-full bg-[#F2F0FF] min-h-screen ">
          <ContainerLayout className="">
            <div className="min-h-[90vh] w-full grid grid-cols-2">
              <div className="w-full h-full flex flex-col justify-center gap-y-2">
                <span className="text-[18px] font-LatoBold text-pink">
                  Best Furniture For Your Home Sweet Home 😊😊
                </span>
                <h1 className="text-[60px] font-JosefinBold text-primarytext  ">
                  New Furniture Collection Trends In 2025
                </h1>
                <span className="font-Lato text-subtext2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consequuntur et doloremque atque itaque tempora, iure culpa,
                  porro reprehenderit veritatis nisi est vero vitae natus
                  deserunt quas minus eum vel enim odit quae voluptatem eius.
                  Sint incidunt voluptates ipsam. Totam perferendis hic iste,
                  nulla at quidem iure temporibus nemo voluptatibus cum!
                </span>
                <Button className="bg-pink w-28 text-white mt-5 font-JosefinSemibold">
                  Shop Now
                </Button>
              </div>
              <div className="w-full h-auto flex items-center justify-end relative">
                <Image
                  src={shapeProduct}
                  alt="product"
                  className="absolute right-0 z-0"
                />
                <div className="z-10 flex relative">
                  <Image
                    src={shapeDiscount}
                    alt="discount"
                    className=" absolute right-0 "
                  />
                  <Image src={mainProduct} alt="product" className="" />
                </div>
              </div>
            </div>
          </ContainerLayout>
        </div>
        <section>
          <ContainerLayout className="mt-20">
            <div className="flex flex-col items-center ">
              <Heading variant="primary" className="text-center mb-20">
                Featured Products
              </Heading>
              <div className="flex gap-x-10">
                <FeaturedProductCard
                  code="JWOJ28"
                  color={color}
                  image="https://pngimg.com/uploads/chair/chair_PNG6862.png"
                  price={44.01}
                  title="Chair Kelavanri"
                />
              </div>
            </div>
          </ContainerLayout>
        </section>
        <LatestProductsSection />
        <ShopOffersSection />
        <TrendingAdsSection />
        <TrendingProductSection />
        <DiscountItemSection />
        <SubscribeAdsSection />
        <LatestBlogSection />
      </main>
    </div>
  );
}
