import SectionHeader from "@/components/SectionHeader";
import { Heading } from "@/components/ui/heading";
import Orders from "./page";

export default async function OrdersLayout() {
  return (
    <>
      <SectionHeader title="Orders" description="Orders Products Data" />
      <Orders />
    </>
  );
}
