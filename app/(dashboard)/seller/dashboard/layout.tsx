import SidebarNav from "@/components/element/SidebarNav";

export default async function DashboardLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <>
      <div className="w-full mt-[4rem] h-screen flex">
        <header className="max-w-[20%] w-full">
          <SidebarNav />
        </header>
        <main className="p-10 w-full max-w-[80%] ">{children}</main>
      </div>
    </>
  );
}
