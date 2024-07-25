const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
	const livingRoom = await prisma.category.create({
		data: {
			name: "Living Room",
			slug: "living-room",
			image:
				"https://vqeowfcbngeyipwzpkul.supabase.co/storage/v1/object/public/category-icon/living.png",
		},
	});

	const bedroom = await prisma.category.create({
		data: {
			name: "Bedroom",
			slug: "bedroom",
			image:
				"https://vqeowfcbngeyipwzpkul.supabase.co/storage/v1/object/public/category-icon/bedroom.png",
		},
	});

	const diningRoom = await prisma.category.create({
		data: {
			name: "Dining Room",
			slug: "dining-room",
			image:
				"https://vqeowfcbngeyipwzpkul.supabase.co/storage/v1/object/public/category-icon/dinner_table.png",
		},
	});

	const homeOffice = await prisma.category.create({
		data: {
			name: "Home Office",
			slug: "home-office",
			image:
				"https://vqeowfcbngeyipwzpkul.supabase.co/storage/v1/object/public/category-icon/workplace.png",
		},
	});

	const outdoor = await prisma.category.create({
		data: {
			name: "Outdoor",
			slug: "outdoor",
			image:
				"https://vqeowfcbngeyipwzpkul.supabase.co/storage/v1/object/public/category-icon/outdoor.png",
		},
	});

	const kitchen = await prisma.category.create({
		data: {
			name: "Kitchen",
			slug: "kitchen",
			image:
				"https://vqeowfcbngeyipwzpkul.supabase.co/storage/v1/object/public/category-icon/cooking.png",
		},
	});

	const bathroom = await prisma.category.create({
		data: {
			name: "Bathroom",
			slug: "bathroom",
			image:
				"https://vqeowfcbngeyipwzpkul.supabase.co/storage/v1/object/public/category-icon/bath.png",
		},
	});

	const kids = await prisma.category.create({
		data: {
			name: "Kids",
			slug: "kids",
			image:
				"https://vqeowfcbngeyipwzpkul.supabase.co/storage/v1/object/public/category-icon/crib.png",
		},
	});

	const storage = await prisma.category.create({
		data: {
			name: "Storage & Organization",
			slug: "storage-organization",
			image:
				"https://vqeowfcbngeyipwzpkul.supabase.co/storage/v1/object/public/category-icon/boxes.png",
		},
	});
	console.log({
		livingRoom,
		homeOffice,
		diningRoom,
		bedroom,
		outdoor,
		kids,
		kitchen,
		bathroom,
		storage,
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
