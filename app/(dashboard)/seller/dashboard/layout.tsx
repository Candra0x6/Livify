import SidebarNav from "@/components/element/SidebarNav";

export default async function DashboardLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <>
      <div className="w-full h-[200vh] container mx-auto flex">
        <SidebarNav />
        <main className="flex-1 p-10">{children}</main>
      </div>
    </>
  );
}
