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
import { useStoreAction } from "@/hooks/useStoreAction";
import { getSession } from "@/lib/auth/auth";
import type { Product } from "@prisma/client";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { IoAdd } from "react-icons/io5";
import { PiNotePencil } from "react-icons/pi";

export const DeleteStoreDialog: React.FC<{ Id: string }> = ({ Id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { deleteStore } = useStoreAction();
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-full">
          Delete Store
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[100vh] duration-300 transition-all ">
        <DialogHeader>
          <DialogTitle>Delete Store !!</DialogTitle>
          <DialogDescription>
            🗑️ Are you sure you want to delete your store? This action cannot be
            undone."
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="destructive"
            onClick={async () => {
              const session = await getSession();
              await deleteStore(session?.storeId as string);
            }}
          >
            Confirm
          </Button>
          <Button>Cancle</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
