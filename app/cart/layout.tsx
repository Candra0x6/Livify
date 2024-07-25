import Footer from "@/components/element/Footer";
import HeaderNav from "@/components/layout/HeaderWrap";

export default async function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="relative">{children}</main>;
    </>
  );
}
