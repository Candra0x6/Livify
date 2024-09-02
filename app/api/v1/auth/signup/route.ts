import { PrismaClient } from "@prisma/client";
import { Base64 } from "js-base64";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
	try {
		const { name, email, password, role } = await request.json();
		if (!name || !email || !password || !role) {
			return NextResponse.json(
				{ message: "All fields are required" },
				{ status: 400 },
			);
		}
		const hashedPassword = Base64.encode(password);
		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
				role,
			},
		});
		return NextResponse.json(
			{
				user: {
					id: user.id,
					name: user.name,
					email: user.email,
					role: user.role,
				},
			},
			{ status: 201, statusText: "Success Create New User" },
		);
	} catch (error) {
		console.error("Error creating user:", error);

		if (error instanceof Error) {
			if (
				error.message.includes(
					"Unique constraint failed on the fields: (`email`)",
				)
			) {
				return NextResponse.json(
					{ message: "Email already exists" },
					{ status: 400 },
				);
			}
		}

		return NextResponse.json(
			{ message: "Unable to create new user" },
			{ status: 500, statusText: "Internal Server Error" },
		);
	}
}
