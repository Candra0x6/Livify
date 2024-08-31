import { useCartAction } from "@/hooks/useCartAction";
import type { CartProducts } from "@/interfaces/models/Cart";
import { formatPrice } from "@/lib/utils";
import type { CartItem, Product } from "@prisma/client";
import { MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import type { FC } from "react";
import { FaStar } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { Button } from "../ui/button";
import Flex from "../ui/flex";

export interface CartData extends CartItem {
  product: Product;
}
export type CartDetailsProps = {
  data?: CartData;
  cart: CartProducts[] | undefined;
  setCart: React.Dispatch<React.SetStateAction<CartProducts[] | undefined>>;
};
export const CartDetailsCard: FC<CartDetailsProps> = ({
  cart,
  data,
  setCart,
}) => {
  const { decrementCartItem, deleteCartItem, incrementCartItem, onCheckOut } =
    useCartAction({ cart, data, setCart });
  const handleDecrement =
    (cartItemId: string | undefined) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      decrementCartItem({ cartItemId });
    };
  const handleIncrement =
    (cartItemId: string | undefined) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      incrementCartItem({ cartItemId });
    };
  const handleDelete =
    (cartItemId: string | undefined) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      deleteCartItem({ cartItemId });
    };
  return (
    <div className="group/card border duration-300 transition-all sm:w-full sm:h-full h-[150px] group cursor-pointer relative overflow-hidden flex sm:gap-x-10 gap-x-5 bg-white shadow-sh-card rounded-xl sm:p-4 p-3">
      <div className="relative bg-[#F6F7FB] md:w-36 md:h-36 w-[7.8rem] h-[7.8rem]  aspect-square">
        <Image
          fill
          // @ts-ignore
          src={data?.product?.images[0]}
          alt={data?.product?.name as string}
          className="w-full h-full aspect-square rounded-xl"
        />
      </div>
      <div className=" sm:space-y-2 space-y-7 w-full">
        <div className="sm:mb-5">
          <Flex justify="space-between" align="center">
            <div className="w-full">
              <div className="flex w-full justify-between">
                <h1 className="sm:text-2xl text-lg font-semibold">
                  {data?.product?.name}
                </h1>
                <Button
                  variant="destructive"
                  className="p-0 aspect-square rounded-full sm:w-10 sm:h-10 w-6 h-6"
                  onClick={handleDelete(data?.id)}
                >
                  <IoClose className="sm:text-2xl text-md" />
                </Button>
              </div>
              <span className="sm:text-base text-sm">Chair</span>
            </div>
          </Flex>
          <Flex className="gap-x-2">
            <div className="flex items-center gap-x-1">
              <FaStar color="#f8ed24" className="sm:w-[20px] w-[15px]" />
              <span className="text-sm">4.5</span>
            </div>
          </Flex>
        </div>
        <div className="w-full flex justify-between ">
          <span className="text-primary font-bold sm:text-xl text-md items-end flex">
            {/* @ts-expect-error */}
            {formatPrice(Number.parseFloat(data?.product?.price))}
          </span>
          <div className="flex gap-x-2 items-center">
            <Button
              size="icon"
              variant="default"
              className="p-0 aspect-square sm:w-10 sm:h-10 w-6 h-6"
              onClick={handleIncrement(data?.id)}
            >
              <PlusIcon className="p-[2px]" />
            </Button>
            <h1>{data?.quantity}</h1>
            <Button
              size="icon"
              variant="default"
              className="p-0 aspect-square sm:h-10 sm:w-10 w-6 h-6"
              onClick={handleDecrement(data?.id)}
            >
              <MinusIcon className="p-[2px]" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
