import { cookies } from "next/headers";

function UseCookie() {
	const sessionTokenCookie = cookies().get("session")?.value;

	return { sessionTokenCookie };
}

export default UseCookie;
