import type { FC } from "react";
import Flex from "../ui/flex";
import { Heading } from "../ui/heading";

const DetailsMenu: FC = () => {
  return (
    <Flex direction="column">
      <Flex gap={70} className="py-1 border-b-2 border-gray-200">
        <Heading size="lg" className="text-primarytext">
          Materials
        </Heading>
        <Heading size="lg" className="text-primarytext">
          Shipping
        </Heading>
        <Heading size="lg" className="text-primarytext">
          Return Policy
        </Heading>
      </Flex>
      <div className="w-28 h-[2px] bg-primarytext -mt-[2px]" />
      <div className="py-2">
        <p className="font-LatoRegular text-subtext2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur
          animi expedita asperiores et quaerat culpa, autem fugiat, eligendi
          eaque maiores provident, ut explicabo possimus. Sed assumenda rerum
          nam temporibus sit!
        </p>
      </div>
    </Flex>
  );
};

export default DetailsMenu;
