import { cn } from "@/lib/utils";
import * as React from "react";

const Menu = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex relative overflow-hidden", className)}
    {...props}
  />
));
Menu.displayName = "Menu";

const MenuItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex", className)} {...props} />
));
MenuItem.displayName = "MenuItem";

interface MenuTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  active?: string;
  isActive?: boolean;
  className?: string;
}

const MenuTitle = React.forwardRef<HTMLHeadingElement, MenuTitleProps>(
  ({ isActive, active, className, ...props }, ref) => (
    <h3
      ref={ref}
      style={{
        color: isActive ? active : "#151875",
        textDecoration: isActive ? "underline" : "",
      }}
      className={cn(
        "font-LatoRegular underline-offset-[5px] text-xl",
        className
      )}
      {...props}
    />
  )
);
MenuItem.displayName = "MenuItem";

export { Menu, MenuItem, MenuTitle };
