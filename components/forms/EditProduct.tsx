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
import { Box, X } from "lucide-react";
import {
  type Control,
  type FieldPath,
  type FieldValues,
  useController,
  useForm,
} from "react-hook-form";
import { BiDollar } from "react-icons/bi";
import { z } from "zod";
import { Textarea } from "../ui/textarea";

import { useProductActions } from "@/hooks/useProductAction";
import { fetchCategory } from "@/services/api/productsApi";
import type { Category, Product } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Product name must be at least 3 characters long",
  }),
  description: z.string().optional(),
  categoryId: z.string(),
  price: z.coerce.number().min(1, "Price is required"),
  images: z.array(
    z.union([
      z.string(),
      z.object({
        url: z.string(),
        file: z.any(),
        name: z.string(),
        size: z.number(),
        type: z.string(),
      }),
    ])
  ),
  stock: z.coerce.number(),
});

export interface productEditPayload extends z.infer<typeof formSchema> {}

interface FileUploadProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
}

export const FileUpload = <T extends FieldValues>({
  name,
  control,
}: FileUploadProps<T>) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChange([
            ...(value || []),
            {
              url: event.target.result as string,
              file: file,
              name: file.name,
              size: file.size,
              type: file.type,
            },
          ]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    onChange(value.filter((_: any, i: number) => i !== index));
  };

  return (
    <>
      <div className="pb-5 flex flex-col gap-4">
        <div className="flex flex-wrap gap-5">
          {value &&
            value.length > 0 &&
            // biome-ignore lint/suspicious/noExplicitAny: <nah>
            value.map((item: any, index: number) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <i think its still ok>
              <div key={index} className="relative w-[200px] h-[200px]">
                <Button
                  type="button"
                  className="z-10 absolute -top-3 -right-3 bg-destructive text-destructive-foreground rounded-full"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-6 w-6 text-red" />
                </Button>
                <img
                  className="rounded-md object-cover"
                  alt={item.name ?? "Pic"}
                  src={item.url || item}
                />
              </div>
            ))}
        </div>
        <Button className=" text-white relative w-40 ">
          <h1>Upload Image </h1>
          <Input
            id="dropzone-file"
            type="file"
            className="opacity-0 absolute w-full h-full cursor-pointer"
            accept="image/*"
            onChange={handleImageFile}
          />
        </Button>
      </div>
    </>
  );
};

export const EditProductForm: React.FC<{ data: Product | undefined }> = ({
  data,
}) => {
  const { editProduct } = useProductActions();
  const form = useForm<productEditPayload>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name,
      description: data?.description || "",
      categoryId: data?.categoryId,
      price: data?.price as unknown as number,
      images: data?.images as string[],
      stock: data?.stock,
    },
  });
  const [category, setCategory] = useState<{ categories: Category[] } | null>(
    null
  );

  useEffect(() => {
    async function fetchData() {
      const categoryData = await fetchCategory();
      setCategory(categoryData);
    }
    fetchData();
  }, []);

  const onSubmit = async (values: productEditPayload) => {
    try {
      const result = await editProduct(values, data?.id as string);
      console.log("Product updated:", result);
    } catch (error) {
      console.error("Error updating product:", error);
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
                        // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
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
                        // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
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
