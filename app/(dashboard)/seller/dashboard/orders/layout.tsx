import { Heading } from "@/components/ui/heading";
import Orders from "./page";

export default async function OrdersLayout() {
  return (
    <>
      <Heading className="text-primarytext mb-10">Products</Heading>
      <Orders />
    </>
  );
}
