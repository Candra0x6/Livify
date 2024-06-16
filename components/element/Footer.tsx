import React, { FC } from "react";
import ContainerLayout from "../layout/ContainerLayout";
import Flex from "../ui/flex";
import { Heading } from "../ui/heading";
import { Input } from "../ui/input";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { CiSearch } from "react-icons/ci";
import Grid from "../ui/grid";

const Footer: FC = () => {
  return (
    <footer className="bg-[#EEEFFB] w-full mt-44">
      <ContainerLayout>
        <Flex className="py-20">
          <Flex direction="column" gap={5}>
            <Heading className="text-[40px]">Livify</Heading>
            <div className="h-full w-[30vh] flex items-center bg-white my-6">
              <input
                type="text"
                placeholder="Enter Your Email"
                className="py-1 w-full outline-none p-3 text-sm text-subtext2 focus:outline-none font-LatoRegular"
              />
              <Button className="bg-pink rounded-none text-white font-JosefinRegular ">
                Sign Up
              </Button>
            </div>
            <Text className="font-LatoRegular text-subtext2 text-md">
              Contact Info
            </Text>
            <Text className="text-subtext2 text-md">
              17 Princess Road, London, Greater London NW1 8JR, UK
            </Text>
          </Flex>
          <Grid
            columns={3}
            className="w-full place-content-start place-items-center"
          >
            <Flex direction="column">
              <Heading className="text-[25px] mb-5">Categories</Heading>
              <ul className="text-subtext2 font-LatoRegular space-y-2">
                <li>Laptop</li>
                <li>Laptop</li>
                <li>Laptop</li>
              </ul>
            </Flex>
            <Flex direction="column">
              <Heading className="text-[25px] mb-5">Customer Care</Heading>
              <ul className="text-subtext2 font-LatoRegular space-y-2">
                <li>Laptop</li>
                <li>Laptop</li>
                <li>Laptop</li>
              </ul>
            </Flex>
            <Flex direction="column">
              <Heading className="text-[25px] mb-5">Pages</Heading>
              <ul className="text-subtext2 font-LatoRegular space-y-2">
                <li>Laptop</li>
                <li>Laptop</li>
                <li>Laptop</li>
              </ul>
            </Flex>
          </Grid>
        </Flex>
      </ContainerLayout>
    </footer>
  );
};

export default Footer;
