import { AddProductForm } from "@/components/forms/AddProductForm";
import { EditProductForm } from "@/components/forms/EditProduct";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Product } from "@prisma/client";
import { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { PiNotePencil } from "react-icons/pi";

export const EditProductDialog: React.FC<{ Id: string }> = ({ Id }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const getProductById = async (productId: string) => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/product/${productId}`,
          {
            method: "GET",
          }
        );
        const data = await res.json();
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      getProductById(Id);
    }
  }, [Id, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="p-0 hover:bg-secondary/20 shadow-none shadow-white hover:text-primary"
        >
          <PiNotePencil className=" text-[24px]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[100vh] duration-300 transition-all ">
        <DialogHeader>
          <DialogTitle className="text-2xl">Edit Product</DialogTitle>
          <DialogDescription>
            Edit product from your store by filling the form below. Click submit
            when you're done.
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div>Loading product data...</div>
        ) : product ? (
          <EditProductForm data={product && product} />
        ) : (
          <div>Failed to load product data.</div>
        )}
      </DialogContent>
    </Dialog>
  );
};
