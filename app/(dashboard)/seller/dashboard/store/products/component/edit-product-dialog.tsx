import { EditProductForm } from "@/components/forms/EditProduct";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { ProductDetails } from "@/interfaces/models/Product";
import { fetchProductById } from "@/services/api/productsApi";
import { useEffect, useState } from "react";
import { PiNotePencil } from "react-icons/pi";

export const EditProductDialog: React.FC<{ Id: string }> = ({ Id }) => {
  const [product, setProduct] = useState<ProductDetails>();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const getProductById = async (productId: string) => {
      const data = await fetchProductById(productId);
      setProduct(data?.product);
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
        <EditProductForm data={product && product} />
      </DialogContent>
    </Dialog>
  );
};
