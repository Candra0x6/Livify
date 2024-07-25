export default function AuthLayout({ children }: React.PropsWithChildren) {
	return (
		<div className="max-w-7xl min-h-screen relative container mx-auto">
			<div className="max-w-2xl mt-20 mx-auto">{children}</div>
		</div>
	);
}
