"use client";
import type { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { type FC } from "react";
import { IoLocationOutline } from "react-icons/io5";
import CartIcon from "../../public/icons/cart.svg";
import HeartIcon from "../../public/icons/heart.svg";
import AuthButton from "../AuthButton";
import ContainerLayout from "../layout/ContainerLayout";
import { Button } from "../ui/button";
import Flex from "../ui/flex";
import { Text } from "../ui/text";

const HeaderUser: FC<{ user: User | null }> = ({ user }) => {
  const router = useRouter();
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
          <AuthButton user={user} />
          <Link href={"/wishlist"} className="flex gap-x-2 items-center">
            <Text className="text-white font-JosefinSemibold text-md">
              Wishlist{" "}
            </Text>
            <Image src={HeartIcon} alt="heart-icon" className="w-4" />
          </Link>
          <Button onClick={() => router.push("/cart")} className="">
            <Image src={CartIcon} alt="heart-icon" className="w-[22px]" />
          </Button>
        </Flex>
      </ContainerLayout>
    </div>
  );
};

export default HeaderUser;
