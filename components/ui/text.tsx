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
    font: {
      default: "font-LatoRegular",
      bold: "font-LatoBold",
      medium: "font-LatoMedium",
      light: "font-LatoLight",
      thin: "font-LatoThin",
      italic: "font-LatoItalic",
      boldItalic: "font-LatoBoldItalic",
      semiBold: "font-LatoSemiBold",
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
    font: "default",
  },
});

export interface SpanProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof headingVariants> {
  asChild?: boolean;
}

const Text = React.forwardRef<HTMLSpanElement, SpanProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "span";
    return (
      <Comp
        className={cn(headingVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Text.displayName = "Text";

export { Text, headingVariants };
