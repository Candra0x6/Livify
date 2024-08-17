import type { cartBody } from "@/app/api/v1/cart/new/route";
import type { addWIshlistBody } from "@/app/api/v1/user/[userId]/wishlist/new/route";
import type { productEditPayload } from "@/components/forms/EditProduct";
import { getSession } from "@/lib/auth/auth";
import type { productPayload } from "@/lib/validators/productSchema";
import toast from "react-hot-toast";

export const useProductActions = () => {
  const addCart = async (data: cartBody) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/new`,
        {
          method: "POST",
          body: JSON.stringify(data),
        },
      );
      const result = await response.json();
      if (!response.ok) {
        toast.error("Whoops 🙃 Something went wrong adding that to your cart");
      } else {
        toast.success("Item added! 🛒 Your cart is up to date.");
      }

      return result;
    } catch {
      toast.error("Whoops 🙃 Something went wrong adding that to your cart");

      throw new Error("Failed add product to cart");
    }
  };
  const addWishlist = async (data: addWIshlistBody) => {
    try {
      const session = await getSession();
      const userId = session?.userId;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/${userId}/wishlist/new`,
        {
          method: "POST",
          body: JSON.stringify(data),
        },
      );
      const result = await response.json();
      if (!response.ok) {
        toast.error("Failed to edit product");
      } else {
        toast.success(
          "Item added to wishlist 💭 We'll keep it on hold for later.",
        );
      }


      return result;
    } catch {
      toast.error("Our servers are experiencing some problems. 😖");

      throw new Error("Failed add product to wishlist");
    }
  };
  const createProduct = async (data: productPayload) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("categoryId", data.categoryId);
      formData.append("price", data.price.toString());
      formData.append("stock", data.stock.toString());
      if (data.description) {
        formData.append("description", data.description);
      }

      data.images.forEach((image, index) => {
        if (image.file instanceof File) {
          formData.append(`image${index}`, image.file, image.name);
        }
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/new`,
        {
          method: "POST",
          body: formData,
        },
      );
      const result = await response.json();
      if (!response.ok) {
        toast.error("Failed to add product");
      } else {
        toast.success(
          "Product added! 🛍 Your new item is now live in catalog.",
        );
      }

      return result;
    } catch {
      toast.error("Our servers are experiencing some problems. 😖");
      throw new Error("Error create product");
    }
  };

  const editProduct = async (data: productEditPayload, productId: string) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("categoryId", data.categoryId);
      formData.append("price", data.price.toString());
      if (data.description) {
        formData.append("description", data.description);
      }
      formData.append("stock", data.stock.toString());
      data.images.forEach((image, index) => {
        if (typeof image === "string") {
          formData.append(`existingImage${index}`, image);
        } else {
          formData.append(`newImage${index}`, image.file, image.name);
        }
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${productId}/edit`,
        {
          method: "PATCH",
          body: formData,
        },
      );

      const result = await response.json();
      if (!response.ok) {
        toast.error("Failed to edit product");
      } else {
        toast.success("Updated details saved ✅. Buyers appreciate fresh info.");
      }
      return result;
    } catch {
      throw new Error("Failed to update product");
    }
  };

  return { addCart, addWishlist, createProduct, editProduct };
};
