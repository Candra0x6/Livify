"use client";
import type { IconMenuListProps } from "@/components/AuthButton";
import { Text } from "@/components/ui/text";
import {
	redirect,
	usePathname,
	useRouter,
	useSelectedLayoutSegment,
} from "next/navigation";
import { BiBox } from "react-icons/bi";
import { LuClipboardList } from "react-icons/lu";
import { MdOutlineStorefront } from "react-icons/md";
import { TbLayoutDashboard } from "react-icons/tb";
interface SidebarNavigation extends IconMenuListProps {
	segment: string | null;
	id: number;
}

export const DashboardMenuList: SidebarNavigation[] = [
	{
		id: 0,
		name: "Dashboard",
		href: "/seller/dashboard",
		icon: TbLayoutDashboard,
		segment: null,
	},
	{
		id: 1,
		name: "Products",
		href: "/seller/dashboard/products",
		icon: BiBox,
		segment: "products",
	},
	{
		id: 2,
		name: "Order Lists",
		href: "/seller/dashboard/orders",
		icon: LuClipboardList,
		segment: "orders",
	},
	{
		id: 3,
		name: "Store",
		href: "/seller/dashboard/store",
		icon: MdOutlineStorefront,
		segment: "store",
	},
];
const SidebarNav: React.FC = () => {
	const router = useRouter();
	const segment = useSelectedLayoutSegment();
	return (
		<aside className="w-[15%] h-full bg-white border-gray-200 pt-10 border-r-[2px] pr-3">
			<div className="grid grid-flow-row grid-cols-1 space-y-2">
				{DashboardMenuList.map((menu, i) => (
					<div
						key={menu.id}
						onClick={() => router.push(menu.href)}
						onKeyUp={() => router.push(menu.href)}
						className={`flex space-x-3 p-3 hover:bg-slate-100 cursor-pointer ${
							segment === menu.segment ? "bg-slate-100" : ""
						}`}
					>
						<menu.icon className="text-xl" />
						<Text className="font-JosefinSemibold text-md">{menu.name}</Text>
					</div>
				))}
			</div>
		</aside>
	);
};

export default SidebarNav;
