"use client";
import React, { FC } from "react";
import ContainerLayout from "../layout/ContainerLayout";
import Flex from "../ui/flex";
import Image from "next/image";
import PhoneIcon from "../../public/icons/phone.svg";
import MailIcon from "../../public/icons/mail.svg";
import HeartIcon from "../../public/icons/heart.svg";
import CartIcon from "../../public/icons/cart.svg";
import { Text } from "../ui/text";
import Link from "next/link";
import AuthButton from "../AuthButton";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { IoLocationOutline } from "react-icons/io5";

const HeaderUser: FC<{ user: User | null }> = ({ user }) => {
  const supabase = createClient();
  const canInitSupabaseClient = () => {
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();
  return (
    <div className="bg-[#7E33E0]">
      <ContainerLayout className="flex justify-between p-3">
        <Flex gap={40}>
          <Flex align="center" gap={10}>
            <IoLocationOutline className="text-white text-xl" />
            <Text className="text-white font-JosefinSemibold text-md">
              {user?.email}
            </Text>
          </Flex>
        </Flex>
        <Flex align="center" className="gap-x-6">
          {isSupabaseConnected && <AuthButton user={user} />}
          <Link href={`/wishlist`} className="flex gap-x-2 items-center">
            <Text className="text-white font-JosefinSemibold text-md">
              Wishlist{" "}
            </Text>
            <Image src={HeartIcon} alt="heart-icon" className="w-4" />
          </Link>
          <Link href={`/cart`} className="">
            <Image src={CartIcon} alt="heart-icon" className="w-[22px]" />
          </Link>
        </Flex>
      </ContainerLayout>
    </div>
  );
};

export default HeaderUser;
