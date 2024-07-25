import React, { FC } from "react";
import ContainerLayout from "./layout/ContainerLayout";
import Grid from "./ui/grid";
import ShopOffersCard from "./cards/ShopOffersCard";
import { Heading } from "./ui/heading";

type Props = {};

const ShopOffersSection: FC<Props> = (props) => {
  return (
    <section>
      <ContainerLayout>
        <Heading className="text-center text-primarytext mt-44  ">
          What Shopex Offer!
        </Heading>
        <Grid
          columns={4}
          gap={50}
          autoFlow="grid-auto-flow-row"
          className="mt-20"
        >
          <ShopOffersCard
            title="24/7 Support"
            image="https://pngimg.com/uploads/chair/chair_PNG6862.png"
            description=" Code Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat corrupti dicta vel sunt, adipisci culpa dolorum mollitia illum praesentium dolore?"
          />
          <ShopOffersCard
            title="24/7 Support"
            image="https://pngimg.com/uploads/chair/chair_PNG6862.png"
            description=" Code Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat corrupti dicta vel sunt, adipisci culpa dolorum mollitia illum praesentium dolore?"
          />
          <ShopOffersCard
            title="24/7 Support"
            image="https://pngimg.com/uploads/chair/chair_PNG6862.png"
            description=" Code Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat corrupti dicta vel sunt, adipisci culpa dolorum mollitia illum praesentium dolore?"
          />
          <ShopOffersCard
            title="24/7 Support"
            image="https://pngimg.com/uploads/chair/chair_PNG6862.png"
            description=" Code Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat corrupti dicta vel sunt, adipisci culpa dolorum mollitia illum praesentium dolore?"
          />
        </Grid>
      </ContainerLayout>
    </section>
  );
};

export default ShopOffersSection;
