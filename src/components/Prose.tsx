import React, { PropsWithChildren } from "react";

const Prose: React.FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => (
  <article className={`prose prose-zinc dark:prose-invert max-w-none ${className ?? ""}`.trim()}>
    {children}
  </article>
);

export default Prose; 