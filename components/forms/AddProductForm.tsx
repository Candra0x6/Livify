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

import { useProductActions } from "@/hooks/useProductAction";
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

export const AddProductForm: React.FC = () => {
  const { createProduct } = useProductActions();
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
      await createProduct(values);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 ">
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium font-heading">Images</FormLabel>

              <FormControl>
                <FileUpload control={form.control} name="images" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium font-heading">Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  id="name"
                  className="text-sm border border-meta-foreground/20 bg-meta text-meta-foreground focus:ring-meta focus:ring-offset-1 block w-full"
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
              <FormLabel className="font-medium font-heading">
                Description
              </FormLabel>
              <FormControl>
                {/* @ts-ignore */}
                <Textarea
                  id="desription"
                  className="text-sm border border-meta-foreground/20 bg-meta text-meta-foreground focus:ring-meta focus:ring-offset-1 block w-full"
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
                <FormLabel className="font-medium font-heading">
                  Category
                </FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(value: typeof field.value) =>
                    field.onChange(value)
                  }
                >
                  <FormControl>
                    <SelectTrigger className="text-sm border border-meta-foreground/20 bg-meta text-meta-foreground focus:ring-meta focus:ring-offset-1 w-full rounded-md">
                      <SelectValue placeholder="Select a Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-meta">
                    {category &&
                      category.categories.length > 0 &&
                      category.categories.map((item, i) => (
                        <SelectItem
                          key={item.id}
                          className="text-sm bg-meta text-meta-foreground focus:ring-meta focus:ring-offset-1 block w-full"
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
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium font-heading">
                  Color
                </FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(value: typeof field.value) =>
                    field.onChange(value)
                  }
                >
                  <FormControl>
                    <SelectTrigger className="text-sm border border-meta-foreground/20 bg-meta text-meta-foreground focus:ring-meta focus:ring-offset-1 w-full rounded-md">
                      <SelectValue placeholder="Select a Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-meta">
                    {category &&
                      category.categories.length > 0 &&
                      category.categories.map((item, i) => (
                        <SelectItem
                          key={item.id}
                          className="text-sm bg-meta text-meta-foreground focus:ring-meta focus:ring-offset-1 block w-full"
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
        </div>
        <div className="grid grid-cols-2 gap-x-5">
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium font-heading">
                  Stock
                </FormLabel>
                <FormControl>
                  <div className="relative flex items-center">
                    <Box className="absolute left-2 text-xl text-subtext3" />
                    <Input
                      type="number"
                      id="stock"
                      placeholder="0"
                      className="text-sm pl-9 border border-meta-foreground/20 bg-meta text-meta-foreground focus:ring-meta focus:ring-offset-1 block w-full"
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
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium font-heading">
                  Price
                </FormLabel>
                <FormControl>
                  <div className="relative flex items-center">
                    <BiDollar className="absolute left-2 text-xl text-subtext3" />
                    <Input
                      type="number"
                      id="price"
                      placeholder="00.00"
                      className="text-sm pl-8 border border-meta-foreground/20 bg-meta text-meta-foreground focus:ring-meta focus:ring-offset-1 block w-full"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="font-medium w-full text-md">
          Submit
        </Button>
      </form>
    </Form>
  );
};
