import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const headingVariants = cva("font-JosefinBold", {
  variants: {
    variant: {
      default: "text-black",
      primary: "text-primarytext",
    },
    size: {
      default: "text-[42px]",
      sm: "text-xl",
      lg: "text-2xl",
      xl: "text-[38px]",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  asChild?: boolean;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "h1";
    return (
      <Comp
        className={cn(headingVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Heading.displayName = "Heading";

export { Heading, headingVariants };
