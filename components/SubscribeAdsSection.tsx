import React, { FC } from "react";
import Flex from "./ui/flex";
import { Heading } from "./ui/heading";
import { Button } from "./ui/button";
import SubsBg from "../public/images/subscribe-background.png";
import Image from "next/image";
type Props = {};

const SubscribeAdsSection: FC<Props> = () => {
  return (
    <section className="relative h-[40vh] overflow-hidden my-44">
      <Image
        src={SubsBg}
        alt="subs-background"
        className="absolute -z-10 w-full h-full"
      />
      <Flex
        align="center"
        justify="center"
        direction="column"
        gap={30}
        className="z-10 w-full h-full"
      >
        <Heading className="text-primarytext text-center" size="xl">
          Get Lastest Update by Subscribe <br /> Our Newslater
        </Heading>
        <Button className="font-JosefinSemibold bg-pink text-white">
          Subscribe Now
        </Button>
      </Flex>
    </section>
  );
};

export default SubscribeAdsSection;
