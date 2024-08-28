"use client";
import CheckoutForm from "@/components/forms/CheckOutForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { ProductsResponse } from "@/services/api/productsApi";

export const PaymentDialog = ({
  isOpen,
  setIsOpen,
  data,
}: {
  isOpen: string;
  setIsOpen: React.Dispatch<React.SetStateAction<string>>;
  data: ProductsResponse;
}) => {
  return (
    <Dialog open={!!isOpen} onOpenChange={() => setIsOpen("")}>
      <DialogContent className="w-[100vh] duration-300 transition-all ">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Confirm Customer Order ?
          </DialogTitle>
          <DialogDescription>Confirm Customer Order</DialogDescription>
        </DialogHeader>
        <CheckoutForm data={data} />
      </DialogContent>
    </Dialog>
  );
};