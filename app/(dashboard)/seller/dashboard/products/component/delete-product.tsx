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
import { AiOutlineDelete } from "react-icons/ai";
import { IoAdd } from "react-icons/io5";
import { PiNotePencil } from "react-icons/pi";

export const DeleteProductDialog: React.FC<{ Id: string }> = ({ Id }) => {
	const [isOpen, setIsOpen] = useState(false);
	const handleDelete = async () => {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/product/${Id}/delete`,
			{
				method: "DELETE",
			},
		);
		const data = res.json();
		console.log(data);
	};
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="ghost" size="icon">
					<AiOutlineDelete className="text-red text-[24px]" />
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
