import { cn } from "@/lib/utils";
import React from "react";

interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "row-reverse" | "column" | "column-reverse";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  align?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  gap?: number | string;
}

const Flex: React.ForwardRefRenderFunction<HTMLDivElement, FlexProps> = (
  { className, direction, wrap, justify, align, gap, style, children, ...rest },
  ref
) => {
  const flexStyle: React.CSSProperties = {
    flexDirection: direction,
    flexWrap: wrap,
    justifyContent: justify,
    alignItems: align,
    gap: typeof gap === "number" ? `${gap}px` : gap,
    ...style, // Menggabungkan style yang diteruskan melalui prop "style"
  };

  return (
    <div
      ref={ref}
      className={cn("flex", className)}
      style={flexStyle}
      {...rest}
    >
      {children}
    </div>
  );
};

export default React.forwardRef(Flex);
