import React, { FC } from "react";
import ContainerLayout from "./layout/ContainerLayout";
import TrendingProductCard from "./cards/TrendingProductCard";
import { CardContent, CardFooter } from "./ui/card";
import Grid from "./ui/grid";
import Flex from "./ui/flex";
import { Text } from "./ui/text";
import clock from "../public/images/clock.png";
import desk from "../public/images/desk.png";
import Image from "next/image";
import { Heading } from "./ui/heading";
type Props = {};

const TrendingProductSection: FC<Props> = () => {
  const colors = ["#FF5733", "#33FF57", "#3357FF"];

  return (
    <section className="mt-44">
      <ContainerLayout>
        <Heading className="text-center text-primarytext mb-20">
          Trending Products
        </Heading>
        <Grid columns={4} rows={1} gap={50}>
          <TrendingProductCard>
            <TrendingProductCard.Image src="https://pngimg.com/uploads/chair/chair_PNG6862.png" />
            <CardContent>
              <TrendingProductCard.Title>
                Chair Kelavanri
              </TrendingProductCard.Title>
            </CardContent>
            <CardFooter className="flex justify-between gap-10">
              <TrendingProductCard.Price>244.55</TrendingProductCard.Price>
              <TrendingProductCard.PromoPrice>
                299.99
              </TrendingProductCard.PromoPrice>
            </CardFooter>
          </TrendingProductCard>
          <TrendingProductCard>
            <TrendingProductCard.Image src="https://pngimg.com/uploads/chair/chair_PNG6862.png" />
            <CardContent>
              <TrendingProductCard.Title>
                Chair Kelavanri
              </TrendingProductCard.Title>
            </CardContent>
            <CardFooter className="flex justify-between gap-10">
              <TrendingProductCard.Price>244.55</TrendingProductCard.Price>
              <TrendingProductCard.PromoPrice>
                299.99
              </TrendingProductCard.PromoPrice>
            </CardFooter>
          </TrendingProductCard>
          <TrendingProductCard>
            <TrendingProductCard.Image src="https://pngimg.com/uploads/chair/chair_PNG6862.png" />
            <CardContent>
              <TrendingProductCard.Title>
                Chair Kelavanri
              </TrendingProductCard.Title>
            </CardContent>
            <CardFooter className="flex justify-between gap-10">
              <TrendingProductCard.Price>244.55</TrendingProductCard.Price>
              <TrendingProductCard.PromoPrice>
                299.99
              </TrendingProductCard.PromoPrice>
            </CardFooter>
          </TrendingProductCard>
          <TrendingProductCard>
            <TrendingProductCard.Image src="https://pngimg.com/uploads/chair/chair_PNG6862.png" />
            <CardContent>
              <TrendingProductCard.Title>
                Chair Kelavanri
              </TrendingProductCard.Title>
            </CardContent>
            <CardFooter className="flex justify-between gap-10">
              <TrendingProductCard.Price>244.55</TrendingProductCard.Price>
              <TrendingProductCard.PromoPrice>
                299.99
              </TrendingProductCard.PromoPrice>
            </CardFooter>
          </TrendingProductCard>
        </Grid>
        <Flex className="w-full mt-20 relative max-h-[32vh]" gap={20}>
          <Grid columns={2} rows={1} columnGap={20} className="w-[70%]">
            <Flex direction="column" className="bg-[#FFF6FB] p-5">
              <Heading className="font-JosefinSemibold text-primarytext text-[28px]">
                23% off in all Products
              </Heading>
              <Text className="font-LatoSemibold underline underline-offset-4 text-pink text-sm">
                Shop Now
              </Text>
              <Image src={clock} alt="clock" className="self-end" />
            </Flex>
            <Flex direction="column" className="bg-[#EEEFFB] p-5">
              <Heading className="font-JosefinSemibold text-primarytext text-[28px]">
                23% off in all Products
              </Heading>
              <Text className="font-LatoSemibold underline underline-offset-4 text-pink text-sm">
                Shop Now
              </Text>
              <Image src={desk} alt="clock" className="self-end" />
            </Flex>
          </Grid>
          <Flex className="flex-1 h-[32vh] max-h-[32vh]  relative">
            <Grid rows={3} columns={1} rowGap={20} className="h-full w-full ">
              <Flex className="h-[90px] w-full gap-x-7 ">
                <Flex className="bg-[#F5F6F8] w-[40%] h-full">
                  <Image
                    src={clock}
                    alt="clock"
                    className="w-full h-full p-3"
                  />
                </Flex>
                <Flex direction="column" className="w-[60%]" justify="center">
                  <Heading className="text-xl text-primarytext font-JosefinRegular">
                    Executive CLock
                  </Heading>
                  <Text className="font-LatoRegular line-through text-primarytext text-sm">
                    $32.00
                  </Text>
                </Flex>
              </Flex>
              <Flex className="h-[90px] w-full gap-x-7 ">
                <Flex className="bg-[#F5F6F8] w-[40%] h-full">
                  <Image
                    src={clock}
                    alt="clock"
                    className="w-full h-full p-3"
                  />
                </Flex>
                <Flex direction="column" className="w-[60%]" justify="center">
                  <Heading className="text-xl text-primarytext font-JosefinRegular">
                    Executive CLock
                  </Heading>
                  <Text className="font-LatoRegular line-through text-primarytext text-sm">
                    $32.00
                  </Text>
                </Flex>
              </Flex>
              <Flex className="h-[90px] w-full gap-x-7 ">
                <Flex className="bg-[#F5F6F8] w-[40%] h-full">
                  <Image
                    src={clock}
                    alt="clock"
                    className="w-full h-full p-3"
                  />
                </Flex>
                <Flex direction="column" className="w-[60%]" justify="center">
                  <Heading className="text-xl text-primarytext font-JosefinRegular">
                    Executive CLock
                  </Heading>
                  <Text className="font-LatoRegular line-through text-primarytext text-sm">
                    $32.00
                  </Text>
                </Flex>
              </Flex>
            </Grid>
          </Flex>
        </Flex>
      </ContainerLayout>
    </section>
  );
};

export default TrendingProductSection;
