import React, { FC } from "react";
import ContainerLayout from "./layout/ContainerLayout";
import { Heading } from "./ui/heading";
import { Menu, MenuItem, MenuTitle } from "./ui/menu";
import Grid from "./ui/grid";
import Flex from "./ui/flex";
import { Text } from "./ui/text";
import { Button } from "./ui/button";
import Image from "next/image";
import EllipseShape from "../public/svg/ellipse-shape2.svg";
import chair from "../public/images/work-sofa-chair.png";
type Props = {};

const DiscountItemSection: FC<Props> = (Props) => {
  return (
    <section className="mt-44">
      <ContainerLayout>
        <Heading className="text-center text-primarytext">
          Discount Item
        </Heading>
        <Menu className="gap-x-10 flex justify-center mt-10 mb-5">
          <MenuItem>
            <MenuTitle isActive={true} active="#FB2E86">
              Wood Chair
            </MenuTitle>
          </MenuItem>
          <MenuItem>
            <MenuTitle isActive={false} active="#FB2E86">
              Plastic Chair
            </MenuTitle>
          </MenuItem>
          <MenuItem>
            <MenuTitle isActive={false} active="#FB2E86">
              Sofa Collection
            </MenuTitle>
          </MenuItem>
        </Menu>
        <Grid columns={2} rows={1} className="place-items-center">
          <Flex direction="column" gap={20}>
            <Heading className="text-primarytext">
              20% Discount Of All Products
            </Heading>
            <Text className="font-JosefinRegular text-pink text-2xl">
              Eafms Sofa Compact
            </Text>
            <Text className="text-subtext3 text-lg font-LatoRegular">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
              veritatis temporibus, assumenda dolore odit dolores tenetur amet
              eligendi error officiis?
            </Text>
            <Grid columns={2} rows={2} gap={5}>
              <Text className="text-subtext3 text-lg font-LatoRegular">
                ✅Material expose like metals
              </Text>
              <Text className="text-subtext3 text-lg font-LatoRegular">
                ✅Material expose like metals
              </Text>
              <Text className="text-subtext3 text-lg font-LatoRegular">
                ✅Material expose like metals
              </Text>
              <Text className="text-subtext3 text-lg font-LatoRegular">
                ✅Material expose like metals
              </Text>
            </Grid>
            <Button
              variant="default"
              className="bg-pink max-w-[20%] text-white font-JosefinSemibold mt-5"
            >
              Shop Now
            </Button>
          </Flex>
          <Flex justify="center" className="relative">
            <Image src={chair} alt="ellipse-shape" className="z-10" />
            <Image
              src={EllipseShape}
              alt="ellipse-shape"
              className="absolute z-0 place-self-end"
            />
          </Flex>
        </Grid>
      </ContainerLayout>
    </section>
  );
};

export default DiscountItemSection;
