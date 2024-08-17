import type { PropsWithChildren, ReactNode } from "react";
import Orders from "../../store/orders/page";

export default async function OrdersLayout(children: ReactNode) {
  return (
    <main>
      <Orders />
    </main>
  );
}
