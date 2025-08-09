import React, { PropsWithChildren } from "react";

export const Section: React.FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => (
  <section className={`section ${className ?? ""}`.trim()}>
    <div className="container mx-auto px-4">{children}</div>
  </section>
);

export default Section; 