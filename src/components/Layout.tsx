import React, { PropsWithChildren } from "react";
import Footer from "@/components/Footer";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout; 