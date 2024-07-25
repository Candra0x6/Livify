"use client";
import { AddStoreForm } from "@/components/forms/AddStoreForm";
import { EditStore } from "@/components/forms/EditStore";
import { Heading } from "@/components/ui/heading";
import { getSession } from "@/lib/auth/auth";
import type { Store } from "@prisma/client";
import { useSelectedLayoutSegment } from "next/navigation";
import { useEffect, useState } from "react";
interface storeStatus {
	quantity: boolean;
	storeId: string | null;
}
export default function StorePage() {
	const [data, setData] = useState<storeStatus>({
		quantity: false,
		storeId: null,
	});
	const [store, setStore] = useState<{ store: Store }>();

	useEffect(() => {
		const IsAlreadyHaveStore = async () => {
			const session = await getSession();
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/${session?.userId}/store`,
				{
					method: "GET",
				},
			);
			const data = await response.json();
			setData({
				quantity: data.store.quantity,
				storeId: data.store.storeId,
			});
		};
		const store = async (storeId: string) => {
			const res = fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/store/${storeId}`,
				{
					method: "GET",
				},
			);
			const data = (await res).json();
			setStore(await data);
		};
		const fetchSession = async () => {
			try {
				const session = await getSession();
				await store(session?.storeId as string);
			} catch (error) {
				console.error("Error:", error);
			}
		};

		fetchSession();
		IsAlreadyHaveStore();
	}, []);

	return (
		<div>
			<Heading className="text-primarytext mb-10">
				{data.quantity ? "Edit Store" : "Create Store"}
				{data.quantity ? (
					<EditStore store={store?.store as Store} />
				) : (
					<AddStoreForm />
				)}
			</Heading>
		</div>
	);
}
