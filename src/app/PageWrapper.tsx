import Header from "@/components/commons/Header";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: LayoutProps) {
  return (
    <div className="w-[95%] md:w-[90%] lg:w-[80%] 2xl:w-[70%] mx-auto">
      <Header />
      {children}
    </div>
  );
}
