import * as React from "react";
import { cn } from "@/lib/utils";
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("items-center shadow-slate-200 shadow-xl", className)}
    {...props}
  />
));
Card.displayName = "Card";

const CardImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, ...props }, ref) => (
  <img
    ref={ref}
    className={cn("aspect-square object-contain", className)}
    {...props}
  />
));
Card.displayName = "CardImage";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("w-full ", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-JosefinRegular leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("font-JosefinRegular ", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardPrice = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span ref={ref} className={cn("font-LatoRegular ", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-4", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-2 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export interface ObjectProps {
  color?: string;
}
const ObjectColors = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & ObjectProps
>(({ className, color, ...props }, ref) => (
  <div
    ref={ref}
    style={{ backgroundColor: `${color}` }}
    className={cn(`w-4 h-1 rounded-full `, className)}
    {...props}
  />
));
ObjectColors.displayName = "ObjectColors";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardImage,
  CardPrice,
  ObjectColors,
};
