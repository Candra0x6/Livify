import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import Image from "next/image";
import TOrderIcon from "../../../../public/icons/TOrderIcon.svg";
import TPendingIcon from "../../../../public/icons/TPendingIcon.svg";
import TSalesIcon from "../../../../public/icons/TSalesIcon.svg";
import TUSerIcon from "../../../../public/icons/TUserIcon.svg";

const MetricCardData = [
	{
		title: "Total User",
		Icon: TUSerIcon,
		alt: "total-user-icon",
		value: 20,
	},
	{
		title: "Total Order",
		Icon: TOrderIcon,
		alt: "total-order-icon",
		value: 20,
	},
	{
		title: "Total Sales",
		Icon: TSalesIcon,
		alt: "total-sales-icon",
		value: 20,
	},
	{
		title: "Total Pending",
		Icon: TPendingIcon,
		alt: "total-pending-icon",
		value: 20,
	},
];
export default async function Dashboard() {
	return (
		<div>
			<Heading className="text-primarytext mb-10">Products</Heading>

			<div className="grid grid-cols-4 w-full gap-x-10">
				{MetricCardData.map((item, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<Card key={i} className="border-[2px] border-gray-100 shadow-none">
						<CardHeader className="px-5 pt-5 flex items-center space-x-4  ">
							<Image src={item.Icon} alt={item.alt} className="" />
							<CardTitle className="text-lg font-JosefinSemibold text-primarytext">
								{item.title}
							</CardTitle>
						</CardHeader>
						<CardContent className="p-5">
							<Text className="font-LatoRegular text-[40px]">{item.value}</Text>
						</CardContent>
					</Card>
				))}
				j
			</div>
		</div>
	);
}
