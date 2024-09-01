"use client";
import { FilterElement, MobileFilter } from "@/components/Filter";
import SectionHeader from "@/components/SectionHeader";
import { ProductCard } from "@/components/cards/ProductCard";
import ProductListCard from "@/components/cards/ProductListCard";
import ProductGridSkeletonCard from "@/components/skeletons/ProductGridSkeletonCard";
import { ProductListSkeletonCard } from "@/components/skeletons/ProductListSkeletonCard";
import Flex from "@/components/ui/flex";
import Grid from "@/components/ui/grid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import type { ProductDetails } from "@/interfaces/models/Product";
import type { queryPayload } from "@/lib/validators/productSchema";
import { fetchProducts } from "@/services/api/productsApi";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import GridIcon from "../../public/icons/grid-view.svg";
import ListIcon from "../../public/icons/list-view.svg";

export default function ProductsPage() {
  const searchParam = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParam);

  const view = searchParam.get("view");
  const categoryId = searchParam.get("categoryId");
  const sortBy = searchParam.get("sortBy");
  const sortOrder = searchParam.get("sortOrder");

  const [products, setProducts] = useState<ProductDetails[]>();
  const [query, setQuery] = useState<queryPayload>({
    limit: 10,
    page: 1,
    categoryId: categoryId as string,
    sortBy: (sortBy as "name" | "price" | "createdAt") || "createdAt",
    sortOrder: (sortOrder as "desc" | "asc") || "desc",
  });
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts({
          limit: query.limit,
          page: query.page,
          sortBy: query.sortBy,
          sortOrder: query.sortOrder,
          categoryId: query.categoryId,
        });
        setProducts(data.products);
      } catch (err) {
        setLoading(true);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, [query]);

  return (
    <div className="container mx-auto mb-40">
      <Grid className="w-full  place-content-start sm:my-10 sm:mt-32 mt-36 md:grid-cols-2 md:grid-rows-1 grid-rows-2 grid-cols-1">
        <Flex direction="column">
          <SectionHeader
            title="Explore All Products"
            description={`About ${products?.length || "0"} Product${
              products && products?.length > 1 ? "s" : ""
            }`}
          />
        </Flex>
        <div className="w-full md:gap-10 flex gap-x-2">
          <div className="md:hidden flex items-center">
            <MobileFilter setQuery={setQuery} query={query} />
          </div>
          <form className="max-w-sm flex items-center h-full py-2 md:w-[180px] w-full gap-x-2 ">
            <Select
              onValueChange={(data: "asc" | "desc") => {
                params.set("sortOrder", data);
                router.push(`?${params.toString()}`);
                setQuery({ ...query, sortOrder: data });
              }}
            >
              <SelectTrigger className="bg-white rounded-xl shadow-sh-card">
                <SelectValue
                  placeholder="List"
                  defaultValue={sortOrder || ""}
                />
              </SelectTrigger>
              <SelectContent className="bg-white rounded-xl shadow-sh-card">
                <SelectItem value="asc">Esc</SelectItem>
                <SelectItem value="desc">Desc</SelectItem>
              </SelectContent>
            </Select>
          </form>
          <form className="max-w-sm flex items-center h-full py-2 md:w-[180px] w-full gap-x-2">
            <Select
              onValueChange={(value) => {
                params.set("view", value);
                router.push(`?${params.toString()}`);
              }}
            >
              <SelectTrigger className="bg-white rounded-xl shadow-sh-card">
                <SelectValue
                  placeholder={view || "view"}
                  defaultValue="grid-view"
                />
              </SelectTrigger>
              <SelectContent className="bg-white rounded-xl shadow-sh-card">
                <SelectItem value="grid-view">
                  <Text className="text-sm flex gap-x-2">
                    Grid View
                    <Image src={GridIcon} alt="grid-view" className="w-4" />
                  </Text>
                </SelectItem>
                <SelectItem value="list-view">
                  <h1 className="text-sm flex gap-x-3 font-LatoRegular">
                    List View
                    <Image src={ListIcon} alt="grid-view" className="w-4" />
                  </h1>
                </SelectItem>
              </SelectContent>
            </Select>
          </form>
        </div>
      </Grid>
      <Flex className="gap-x-10">
        <Flex
          direction="column"
          className="md:max-w-[20%] md:w-[20%] md:flex-col md:flex hidden gap-y-10"
        >
          <FilterElement query={query} setQuery={setQuery} />
        </Flex>
        <Grid
          className={`grid-flow-row md:w-[80%] w-full h-fit relative ${
            view === "list-view"
              ? "grid-cols-1 lg:gap-y-5 gap-y-2"
              : "xl:grid-cols-4 xl:gap-15 sm:grid-cols-3 md:gap-3 grid-cols-2 md:mt-0 xl:gap-6 gap-2"
          }`}
        >
          {loading ? (
            view === "list-view" ? (
              <ProductListSkeletonCard />
            ) : (
              <ProductGridSkeletonCard />
            )
          ) : products ? (
            products &&
            products.length > 0 &&
            products.map((item) => {
              const Comp = view === "list-view" ? ProductListCard : ProductCard;
              return <Comp key={item.id} data={item} />;
            })
          ) : (
            <div className="flex absolute w-full mx-auto justify-center">
              <h1 className="font-semibold text-4xl">Product Not Found</h1>
            </div>
          )}
        </Grid>
      </Flex>
    </div>
  );
}
