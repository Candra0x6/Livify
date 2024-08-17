import { getSession } from "@/lib/auth/auth";
import type { Store } from "@prisma/client";
interface storeStatus {
  quantity: boolean;
  storeId: string | null;
}
export const fetchStoreById = async (
  storeId: string,
): Promise<{ store: Store } | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/store/${storeId}`,
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      },
    );
    const result = await response.json();
    return result;
  } catch {
    throw new Error("Failed fetch store detail");
  }
};

export const IsAlreadyHaveStore = async (): Promise<
  { store: storeStatus } | undefined
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
