import type { User } from "@prisma/client";
import React, { type FC } from "react";
import HeaderUser from "../element/HeaderUser";
import Navbar from "../element/Navbar";

const HeaderNav: FC<{ user: User | null }> = ({ user }) => {
	return (
		<header className="w-full z-10">
			<HeaderUser user={user} />
			<Navbar />
		</header>
	);
};

export default HeaderNav;
