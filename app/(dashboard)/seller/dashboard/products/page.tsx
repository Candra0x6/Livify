"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Text } from "@/components/ui/text";
import { getSession } from "@/lib/auth/auth";
import type { Product } from "@prisma/client";
import { Key, useEffect, useState } from "react";
import { CgSearch } from "react-icons/cg";
import { DeleteProductDialog } from "./component/delete-product";
import { EditProductDialog } from "./component/edit-product-dialog";
import { NewProductDialog } from "./component/new-product-dialog";

interface paginationType {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface productType {
  pagination: paginationType;
  products: Product[];
}
export default function Products() {
  const [products, setProducts] = useState<productType>();
  useEffect(() => {
    const product = async () => {
      const session = await getSession();
      const storeId = session?.storeId as string | undefined;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/store/${storeId}/products`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      setProducts(data);
    };

    const orders = async () => {
      const orderId = "clyvf9znn000brb0cc3832o4q";
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/order/${orderId}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
    };
    orders();
    product();
  }, []);
  return (
    <>
      <div className="flex w-full justify-between mb-5">
        <div className="flex relative items-center">
          <CgSearch className="absolute left-2 text-xl text-gray-300" />
          <Input
            placeholder="Search Prodcucts"
            className="w-52 border border-gray-200 pl-9 "
          />
        </div>
        <NewProductDialog />
      </div>
      <Table>
        <TableCaption>
          <div className="flex w-full justify-between">
            <div className="">
              <Text className="font-Poppins text-sm">Showing 1-9 of 78</Text>
            </div>
            <div className="flex gap-x-2">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100 font-JosefinSemibold text-[15px] ">
            <TableHead className="w-28">Image</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Avialable Color</TableHead>
            <TableHead className="w-24">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.products?.map((item) => (
            <TableRow key={item.id} className="border-b-2 border-gray-100">
              <TableCell>
                <div className="w-14 aspect-square">
                  <img
                    alt="chair"
                    className="h-full aspect-square w-full object-contain "
                    src={item.images[0] as string}
                  />
                </div>
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.categoryId}</TableCell>
              <TableCell>{item.price.toString()}</TableCell>
              <TableCell>{item.stock}</TableCell>
              <TableCell>
                <div className="flex gap-x-2">
                  <div className="aspect-square w-5 bg-red rounded-full" />
                  <div className="aspect-square w-5 bg-red rounded-full" />
                  <div className="aspect-square w-5 bg-red rounded-full" />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex ">
                  <EditProductDialog Id={item.id} />
                  <DeleteProductDialog Id={item.id} />
                </div>
              </TableCell>
            </TableRow>
          )) || (
            <h1 className="absolute w-full text-center text-2xl mt-2">
              Products are Empty
            </h1>
          )}
        </TableBody>
      </Table>
    </>
  );
}
