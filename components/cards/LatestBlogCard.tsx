import React, { FC } from "react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
  CardImage,
} from "../ui/card";
import { Button } from "../ui/button";
import Flex from "../ui/flex";
import Image from "next/image";
import CalendarIcon from "../../public/icons/calendar.svg";
import PenIcon from "../../public/icons/pen.svg";
import { Text } from "../ui/text";

type LatestBlogCardProps = {};

const LatestBlogCard: FC<LatestBlogCardProps> = () => {
  return (
    <Card className="w-[40vh] h-[50vh] relative cursor-pointer group overflow-hidden group">
      <CardHeader className="h-1/2 bg-[#F6F7FB] overflow-hidden">
        <CardImage
          src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg"
          className="w-full h-full p-0 object-cover transition-all duration-300 ease-in-out hover:scale-110 hover:brightness-75"
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-y-1 w-full  gap-5">
        <Flex gap={20}>
          <Flex gap={5} align="center">
            <Image src={PenIcon} alt="calender-icon" className="w-4" />
            <Text className="font-JosefinRegular text-sm text-primarytext">
              Malveric Dehao
            </Text>
          </Flex>
          <Flex gap={5} align="center">
            <Image
              src={CalendarIcon}
              alt="calender-icon"
              className="w-4 h-4 mb-1"
            />
            <Text className="font-JosefinRegular text-sm text-primarytext">
              21 Agust 2024
            </Text>
          </Flex>
        </Flex>
        <CardTitle className="text-primarytext font-JosefinBold text-[20px] group-hover:text-pink">
          Top Living Room Design
        </CardTitle>
        <CardDescription className="text-[14px] text-subtext3 font-LatoRegular">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos nihil
          odio distinctio officia mollitia iusto laborum, itaque iure in autem.
        </CardDescription>
      </CardContent>
      <CardFooter className="w-full p-0">
        <Button
          variant="link"
          className="text-primarytext underline underline-offset-4 group-hover:text-pink"
        >
          Read More
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LatestBlogCard;
