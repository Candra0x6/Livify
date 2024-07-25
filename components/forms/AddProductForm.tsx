"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BiDollar } from "react-icons/bi";
import { z } from "zod";
import { Textarea } from "../ui/textarea";

import {
  type productPayload,
  productSchema,
} from "@/lib/validators/productSchema";
import type { Category } from "@prisma/client";
import { Box } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FileUpload } from "./FileUpload";

export async function getCategory() {
  const response = fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/category`,
    {
      method: "GET",
    }
  );
  const data = (await response).json();
  return data;
}

export async function addProduct(data: productPayload) {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("categoryId", data.categoryId);
  formData.append("price", data.price.toString());
  formData.append("stock", data.stock.toString());
  if (data.description) {
    formData.append("description", data.description);
  }

  data.images.forEach((image, index) => {
    if (image.file instanceof File) {
      formData.append(`image${index}`, image.file, image.name);
    }
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/product/new`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error("Failed to add product");
  }

  return res;
}
export const AddProductForm: React.FC = () => {
  const form = useForm<productPayload>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      categoryId: "",
      price: "",
      images: [],
      stock: 0,
    },
  });
  const [category, setCategory] = useState<{ categories: Category[] } | null>(
    null
  );
  useEffect(() => {
    async function fetchData() {
      const categoryData = await getCategory();
      setCategory(categoryData);
    }
    fetchData();
  }, []);
  const onSubmit = async (values: productPayload) => {
    try {
      const postProduct = await addProduct(values);
      const data = await postProduct.json();

      if (data) {
        alert("Success Create Product");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 ">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-Poppins">Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  id="name"
                  className="text-sm border border-gray-300 text-subtext2 font-Poppins focus:ring-pink focus:ring-offset-1 block w-full font-normal"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-Poppins">Description</FormLabel>
              <FormControl>
                <Textarea
                  id="desription"
                  className="text-sm border border-gray-300 text-subtext2 font-Poppins focus:ring-pink focus:ring-offset-1 block w-full font-normal pb-10"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-x-5">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-Poppins">Category</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(value: typeof field.value) =>
                    field.onChange(value)
                  }
                >
                  <FormControl>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select a Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white">
                    {category &&
                      category.categories.length > 0 &&
                      category.categories.map((item, i) => (
                        // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
                        <SelectItem
                          key={item.id}
                          className="hover:bg-gray-100 cursor-pointer"
                          value={item.id}
                        >
                          {item.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-Poppins">Price</FormLabel>
                <FormControl>
                  <div className="relative flex items-center">
                    <BiDollar className="absolute left-2 text-xl text-subtext3" />
                    <Input
                      type="number"
                      id="price"
                      placeholder="00.00"
                      className="text-sm pl-7 border border-gray-300 text-subtext2 font-Poppins focus:ring-pink focus:ring-offset-1 block w-full font-normal"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-Poppins">Stock</FormLabel>
                <FormControl>
                  <div className="relative flex items-center">
                    <Box className="absolute left-2 text-xl text-subtext3" />
                    <Input
                      type="number"
                      id="stock"
                      placeholder="0"
                      className="text-sm pl-9 border border-gray-300 text-subtext2 font-Poppins focus:ring-pink focus:ring-offset-1 block w-full font-normal"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-Poppins">Images</FormLabel>

              <FormControl>
                <FileUpload control={form.control} name="images" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-pink text-white font-JosefinRegular w-full text-md"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};
