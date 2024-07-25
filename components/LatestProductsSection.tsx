import React, { FC } from "react";
import ContainerLayout from "./layout/ContainerLayout";
import { Heading } from "./ui/heading";
import { Menu, MenuItem, MenuTitle } from "./ui/menu";
import Flex from "./ui/flex";
import LatestProductCard from "./cards/LatestProductCard";

type Props = {};

const LatestProductsSection: FC<Props> = (props) => {
  return (
    <section className="mt-44 w-full ">
      <ContainerLayout className="">
        <Flex direction="column" align="center" className="w-full">
          <Heading variant="primary" className="mb-20 text-center">
            Leatest Products
          </Heading>
          <Menu className="gap-x-10">
            <MenuItem>
              <MenuTitle isActive={true} active="#FB2E86">
                New
              </MenuTitle>
            </MenuItem>
            <MenuItem>
              <MenuTitle isActive={false} active="#FB2E86">
                Best Seller
              </MenuTitle>
            </MenuItem>
            <MenuItem>
              <MenuTitle isActive={false} active="#FB2E86">
                Featured
              </MenuTitle>
            </MenuItem>
            <MenuItem>
              <MenuTitle isActive={false} active="#FB2E86">
                Special Offer
              </MenuTitle>
            </MenuItem>
          </Menu>
        </Flex>
        <div className="grid grid-cols-5 gap-10 grid-flow-row mt-20">
          <LatestProductCard
            title="Talkeniv Chair"
            price={44.22}
            promoPrice={53.98}
            image="https://pngimg.com/uploads/chair/chair_PNG6862.png"
          />
        </div>
      </ContainerLayout>
    </section>
  );
};

export default LatestProductsSection;
