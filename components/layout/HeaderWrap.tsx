import React, { FC } from "react";
import HeaderUser from "../element/HeaderUser";
import Navbar from "../element/Navbar";
import { User } from "@supabase/supabase-js";

const HeaderNav: FC<{ user: User | null }> = ({ user }) => {
  return (
    <header className="w-full">
      <HeaderUser user={user} />
      <Navbar />
    </header>
  );
};

export default HeaderNav;
