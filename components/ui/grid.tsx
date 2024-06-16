import React from "react";

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number | string;
  rows?: number | string;
  gap?: number | string;
  columnGap?: number | string;
  rowGap?: number | string;
  justify?:
    | "start"
    | "end"
    | "center"
    | "stretch"
    | "space-between"
    | "space-around"
    | "space-evenly";
  align?: "start" | "end" | "center" | "stretch";
  autoFlow?: "grid-auto-flow-row" | "grid-auto-flow-column";
}

const Grid: React.ForwardRefRenderFunction<HTMLDivElement, GridProps> = (
  {
    className,
    columns,
    rows,
    autoFlow,
    gap,
    columnGap,
    rowGap,
    justify,
    align,
    style,
    children,
    ...rest
  },
  ref
) => {
  const gridStyle: React.CSSProperties = {
    gridTemplateColumns:
      typeof columns === "number" ? `repeat(${columns}, 1fr)` : columns,
    gridTemplateRows: typeof rows === "number" ? `repeat(${rows}, 1fr)` : rows,
    gap: typeof gap === "number" ? `${gap}px` : gap,
    columnGap: typeof columnGap === "number" ? `${columnGap}px` : columnGap,
    rowGap: typeof rowGap === "number" ? `${rowGap}px` : rowGap,
    justifyContent: justify,
    alignItems: align,
    gridAutoFlow: autoFlow,
    ...style,
  };

  return (
    <div ref={ref} className={`grid ${className}`} style={gridStyle} {...rest}>
      {children}
    </div>
  );
};

export default React.forwardRef(Grid);
