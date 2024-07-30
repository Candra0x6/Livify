import SectionHeader from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import Products from "./page";

export default function ProductsLayout() {
  return (
    <main>
      <SectionHeader title="Products" description="Store Products Data" />

      <Products />
    </main>
  );
}
