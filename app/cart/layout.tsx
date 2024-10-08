export default async function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="relative min-h-screen">{children}</div>;
}
