export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="max-w-7xl min-h-screen relative container mx-auto">
      {children}
    </div>
  );
}
