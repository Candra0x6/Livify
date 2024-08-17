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
import { useStoreAction } from "@/hooks/useStoreAction";
import { getSession } from "@/lib/auth/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "*Store name must be at least 3 characters long",
  }),
  description: z.string().optional(),
  image: z
    .any()
    .refine((file) => file?.size <= 5000000, "Max image size is 5MB")
    .refine(
      (file) =>
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          file?.type,
        ),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    ),
});

export interface AddStoreForm extends z.infer<typeof formSchema> {}
export const CreateStoreForm: React.FC = () => {
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState<string>();
  const [userId, setUserId] = useState<string>();
  const path = usePathname();
  const { createStore } = useStoreAction();
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await getSession();
        setUserId(session?.userId);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchSession();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files;
    if (FileReader && imageFile && imageFile.length) {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile[0]);
      reader.onload = () => {
        setCurrentImage(reader.result as string);
      };
    }
  };
  const onSubmit = async (values: AddStoreForm) => {
    try {
      const createNewStore = await createStore(values, userId as string);
      const result = await createNewStore.json();
      if (createNewStore.ok) {
        toast.success("Successfully create store 😎");
        if (path === "/sign-up/store/create") {
          router.push("/");
        } else {
          router.refresh();
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 ">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormLabel className="font-medium font-heading mb-2">
                Store Logo
              </FormLabel>
              <div className="flex cursor-pointer">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center aspect-square w-40 h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-meta  hover:bg-meta/20 "
                >
                  {currentImage ? (
                    <img
                      aria-label="Store-Logo"
                      src={currentImage}
                      className="w-full h-full ronded-full cursor-pointer rounded-md"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-Poppins text-center font-bold">
                          Click to upload
                        </span>
                      </p>
                      <p className="text-[9px] text-gray-500 dark:text-gray-400 text-center">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                  )}
                  <Input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const file = e.target.files;
                      if (file && file.length > 0) {
                        field.onChange(file[0]);
                        handleImageFile(e);
                      }
                    }}
                  />
                </label>
              </div>
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

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};
