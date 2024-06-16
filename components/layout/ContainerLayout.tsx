import React, { FC, ReactNode } from "react";

type ContainerLayoutProps = {
  children: ReactNode;
  className?: string;
};
const ContainerLayout: FC<ContainerLayoutProps> = ({ children, className }) => {
  return (
    <div className={`container mx-auto w-full ${className}`}>{children}</div>
  );
};

export default ContainerLayout;
