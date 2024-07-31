import React, { type FC } from "react";
import { CiSearch } from "react-icons/ci";
import ContainerLayout from "../layout/ContainerLayout";
import { Button } from "../ui/button";
import Flex from "../ui/flex";
import Grid from "../ui/grid";
import { Heading } from "../ui/heading";
import { Input } from "../ui/input";
import { Text } from "../ui/text";

const Footer: FC = () => {
  return (
    <footer className="bg-white w-full p-10 text-center xl:text-base text-sm mt-40">
      <h1>
        © 2024 Kurniawan Candra Mahardika. Yo, this is our vibe—no jacking our
        swag, fam! 🗣💯🔥
      </h1>
    </footer>
  );
};

export default Footer;
