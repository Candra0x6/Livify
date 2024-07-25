import React from "react";
import { cn } from "@/lib/utils";

export interface ImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ src, alt, width, height, className, ...props }, ref) => {
    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn("object-contain", className)}
        {...props}
      />
    );
  }
);

Image.displayName = "Image";

export default Image;
