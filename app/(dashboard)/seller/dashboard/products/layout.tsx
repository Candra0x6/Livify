import { Heading } from "@/components/ui/heading";
import Products from "./page";

export default function ProductsLayout() {
  return (
    <>
      <Heading className="text-primarytext mb-10">Products</Heading>
      <Products />
    </>
  );
}
