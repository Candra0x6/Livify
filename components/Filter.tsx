import { MenuIcon } from "lucide-react";
import React, { type FC } from "react";
import { IoFilter } from "react-icons/io5";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Slider } from "./ui/slider";

export const MobileFilter: FC = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white shadow-sh-card"
        >
          <IoFilter className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-3/4 bg-background p-6"
        title="Navbar Menu"
      >
        <aside className="flex flex-col gap-4">
          <SheetHeader>
            <SheetTitle>Filter Menu</SheetTitle>
            <SheetDescription />
          </SheetHeader>

          <div className="text-sm">
            <FilterElement />
          </div>
        </aside>
      </SheetContent>
    </Sheet>
  );
};

export const FilterElement: FC = () => {
  return (
    <Accordion type="single" className="space-y-5 w-full" collapsible>
      <AccordionItem
        value="category"
        className="bg-white shadow-sh-card rounded-xl px-4"
      >
        <AccordionTrigger className="text-lg font-medium">
          Category
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid gap-2">
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox />
              Clothing
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox />
              Accessories
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox />
              Electronics
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox />
              Home & Garden
            </Label>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="price"
        className="bg-white shadow-sh-card rounded-xl px-4"
      >
        <AccordionTrigger className="text-lg font-medium">
          Price
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <span>$0</span>
              <span>$100</span>
            </div>
            <Slider min={0} max={100} step={10} defaultValue={[0, 100]} />
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="rating"
        className="bg-white shadow-sh-card rounded-xl px-4"
      >
        <AccordionTrigger className="text-lg font-medium">
          Rating
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid gap-2">
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox />4 stars and above
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox />3 stars and above
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox />2 stars and above
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox />1 star and above
            </Label>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
