import { AddProductForm } from "@/components/forms/AddProductForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IoAdd } from "react-icons/io5";

export const NewProductDialog: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" className=" text-white p-0 aspect-square">
          <IoAdd className="text-white text-2xl p-0" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[100vh] duration-300 transition-all ">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create New Product</DialogTitle>
          <DialogDescription>
            Add product to your store fill form below. Click add when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <AddProductForm />
      </DialogContent>
    </Dialog>
  );
};
