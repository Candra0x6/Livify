import { getSession } from "@/lib/auth/auth";
import type { StoreDetails } from "@/types/api/response/StoreResponse";
import type { UserStoreValidation } from "@/types/api/response/UserResponse";

export async function fetchStoreById(storeId: string): Promise<StoreDetails | undefined> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/store/${storeId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 60, // Revalidate every 60 seconds
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return undefined; // Store not found
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const store: StoreDetails = await response.json();
    return store;
  } catch (error) {
    console.error('Failed to fetch store detail:', error);
    throw new Error('Failed to fetch store detail. Please try again later.');
  }
}


export const IsAlreadyHaveStore = async (): Promise<
  UserStoreValidation | undefined
> => {
  try {
    const session = await getSession();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/${session?.userId}/store`,
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      },
    );
    const data = await response.json();
    return data;
  } catch {
    throw new Error("Failed fetch store");
  }
};
