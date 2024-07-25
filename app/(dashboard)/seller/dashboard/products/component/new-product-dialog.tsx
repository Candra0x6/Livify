import { AddProductForm } from "@/components/forms/AddProductForm";
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
import { IoAdd } from "react-icons/io5";

export const NewProductDialog: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-pink text-white font-Poppins flex"
        >
          <IoAdd className="text-white text-2xl mr-2" />
          New Product{" "}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[100vh] duration-300 transition-all ">
        <DialogHeader>
          <DialogTitle>Make a Product</DialogTitle>
          <DialogDescription>
            Add product to your store fill form below. Click add when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <AddProductForm />
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
