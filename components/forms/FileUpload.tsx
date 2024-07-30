"use client";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  type Control,
  type FieldPath,
  type FieldValues,
  useController,
} from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input"; // Assuming you have this component

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
          // Append new image to existing array instead of replacing
          onChange([
            ...(value || []),
            {
              url: event.target.result as string,
              file: file,
              name: file.name,
              size: file.size,
              type: file.type, // Add this to check file type in schema
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
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            value.map((item: any, index: number) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
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
                  className="rounded-md object-cover w-full h-full"
                  alt={item.name ?? "Pic"}
                  src={item.url || item}
                />
              </div>
            ))}
        </div>
        <Button className="relative w-40 ">
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
