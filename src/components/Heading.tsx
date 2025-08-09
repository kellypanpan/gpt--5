import React from "react";

export const H1: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => (
  <h1 className={`text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent ${className ?? ""}`.trim()}>
    {children}
  </h1>
);

export const H2: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => (
  <h2 className={`text-2xl md:text-3xl font-bold ${className ?? ""}`.trim()}>{children}</h2>
);

export default { H1, H2 }; 