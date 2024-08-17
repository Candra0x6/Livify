import type { AddStoreForm } from "@/components/forms/CreateStoreForm";
import toast from "react-hot-toast";

export const useStoreAction = () => {
  const createStore = async (data: AddStoreForm, userId: string) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description || "");
      if (data.image) {
        formData.append("image", data.image);
      }

      const response = await fetch(`/api/v1/store/new?userId=${userId}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        toast.error(
          "⚠️ Oops! Something went wrong while creating the store. Please try again.",
        );
      } else {
        toast.success("🎉 Store created successfully! Ready to start selling?");
      }
      const result = await response.json();
      return result;
    } catch {
      throw new Error("Failed create store");
    }
  };
  const editStore = async (data: AddStoreForm, storeId: string) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description || "");
      if (data.image) {
        formData.append("image", data.image);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/store/${storeId}/edit`,
        {
          method: "PATCH",
          body: formData,
        },
      );

      if (!response.ok) {
        toast.error(
          "🚫 Uh-oh! Something went wrong while updating the store. Please try again.",
        )
      } else {
        toast.success("🏬 Store details updated successfully!");
      }

      const result = await response.json();
      return result;
    } catch {
      throw new Error("Failed edit store");
    }
  };

  const deleteStore = async (storeId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/store/${storeId}/delete`,
        {
          method: "DELETE",
        },
      );
      if (!response.ok) {
        toast.error(
          "🚫 Uh-oh! Something went wrong while updating the store. Please try again.",
        );
      } else {
        toast.success("🗑️ Store deleted successfully! It's gone for good.");

      }
      const data = response.json();
      return data;
    } catch {
      throw new Error("Failde delete store");
    }
  };
  return { createStore, editStore, deleteStore };
};
