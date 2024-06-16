import React, { FC } from "react";
import ContainerLayout from "./layout/ContainerLayout";
import Grid from "./ui/grid";
import Image from "next/image";
import a from "../public/images/sofa-chair.png";
import EllipseShape from "../public/svg/ellipse-shape.svg";
import Flex from "./ui/flex";
import { Heading } from "./ui/heading";
import { Button } from "./ui/button";
import { Text } from "./ui/text";

type Props = {};

const TrendingAdsSection: FC<Props> = () => {
  return (
    <section className="bg-[#F1F0FF] relative">
      <ContainerLayout>
        <Grid columns={2} rows={1} className="grid-cols-2">
          <Flex direction="row" className="p-4 mx-auto" align="center">
            <Image src={EllipseShape} alt="shape" className="absolute z-0" />
            <Image src={a} alt="a" className="z-10 " />
          </Flex>
          <Flex direction="column" className="p-4 my-auto" gap={30}>
            <Heading className="text-primarytext text-[35px]">
              Unique Features Of Lestest & Trending Products
            </Heading>
            <ul className="text-lg text-[#ACABC3] list-disc list-inside">
              <li>All frames constructed with hardwood solids and laminates</li>
              <li>
                Reinforced with double wood dowels, glue, screw - nails corner
                blocks and machine nails{" "}
              </li>
              <li>Arms, backs and seats are structurally reinforced</li>
            </ul>
            <Flex direction="row" gap={20} className="">
              <Button size="lg" className="bg-pink text-white">
                Add to Cart
              </Button>
              <Flex direction="column">
                <Text className="text-md font-JosefinSemibold">
                  B&B Italian Sofa
                </Text>
                <Text className="text-sm font-LatoRegular">$32.98</Text>
              </Flex>
            </Flex>
          </Flex>
        </Grid>
      </ContainerLayout>
    </section>
  );
};

export default TrendingAdsSection;
