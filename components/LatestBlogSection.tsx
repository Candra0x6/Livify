import React, { FC } from "react";
import ContainerLayout from "./layout/ContainerLayout";
import Grid from "./ui/grid";
import LatestProductCard from "./cards/LatestProductCard";
import LatestBlogCard from "./cards/LatestBlogCard";
import { Heading } from "./ui/heading";

type Props = {};

const LatestBlogSection: FC<Props> = () => {
  return (
    <section>
      <ContainerLayout>
        <Heading className="text-primarytext text-center mb-20">
          Latest Blog
        </Heading>
        <Grid columns={3} className="grid-flow-row">
          <LatestBlogCard />
          <LatestBlogCard />
          <LatestBlogCard />
        </Grid>
      </ContainerLayout>
    </section>
  );
};

export default LatestBlogSection;
