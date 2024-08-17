"use server";
import SectionHeader from "@/components/SectionHeader";
import { CreateStoreForm } from "@/components/forms/CreateStoreForm";
import { EditStoreForm } from "@/components/forms/EditStoreForm";
import { getSession } from "@/lib/auth/auth";
import { IsAlreadyHaveStore, fetchStoreById } from "@/services/api/storeApi";
import type { Store } from "@prisma/client";

export default async function Profile() {
  const session = await getSession();
  const store = await fetchStoreById(session?.storeId as string);
  const checkStore = await IsAlreadyHaveStore();
  return (
    <div>
      <SectionHeader
        title={checkStore?.store.quantity ? "Edit Store" : "Create Store"}
        description={
          checkStore?.store.quantity
            ? "Edit Yout store by fill fields"
            : "Create Store by fill fields"
        }
      />
      <div className="bg-white shadow-sh-card w-full rounded-xl mt-10">
        <div className="xl:px-40 xl:py-20 lg:px-30 lg:py-20 md:px-20 md:py-10 px-14 py-5">
          {checkStore?.store.quantity ? (
            <EditStoreForm store={store?.store as Store} />
          ) : (
            <CreateStoreForm />
          )}
        </div>
      </div>
    </div>
  );
}
