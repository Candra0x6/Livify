export default async function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="relative">{children}</div>;
    </>
  );
}
