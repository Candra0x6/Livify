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

import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";

export const DeleteProductDialog: React.FC<{ Id: string }> = ({ Id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${Id}/delete`,
        {
          method: "DELETE",
        }
      );
      const data = res.json();
      toast.success("Success Delete Product");
      return data;
    } catch (error) {
      console.error(error);
      toast.success("Failed Delete Product");
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="bg-destructive/20 hover:bg-destructive/5"
        >
          <AiOutlineDelete className="text-destructive text-[24px]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[100vh] duration-300 transition-all ">
        <DialogHeader>
          <DialogTitle>Are you sure wanna delete your product</DialogTitle>
          <DialogDescription>
            Edit product from your store by filling the form below. Click submit
            when you're done.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" onClick={handleDelete}>
            Save changes
          </Button>
          <Button type="submit">Cancle</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
