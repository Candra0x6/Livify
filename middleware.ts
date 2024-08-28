import type { NextRequest } from "next/server";
import { ZodError } from "zod";

import { AppError } from "./utils/api/apiErrors";
import { ApiResponse } from "./utils/api/apiResponse";
export async function middleware(request: NextRequest) { }

export const config = {
	matcher: [
		/*
		 * Match all request paths except:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
		 * Feel free to modify this pattern to include more paths.
		 */
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};

// src/middleware/errorHandler.ts

export function errorHandler(error: unknown) {
	if (error instanceof AppError) {
		return ApiResponse.error(error.message, error.statusCode);
	}

	if (error instanceof ZodError) {
		return ApiResponse.error(`Validation error${error}`, 400);
	}

	console.error("Unhandled error:", error);
	return ApiResponse.error(`An unexpected error occurred ${error}`, 500);
}
