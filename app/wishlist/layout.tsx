import React, { type ReactNode } from "react";

function WishlistLayout({ children }: { children: ReactNode }) {
  return <div className="container mx-auto">{children}</div>;
}

export default WishlistLayout;
