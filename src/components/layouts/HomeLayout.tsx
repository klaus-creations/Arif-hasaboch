import React from "react";
import Header from "../common/Header";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-[95%] sm:w-[90%] lg:w-[85%] 2xl:w-[80%] mx-auto h-screen flex flex-col  overflow-hidden">
      <div className="w-full h-[10%]">
        <Header />
      </div>
      <div className="w-full h-[90%] overflow-y-auto">{children}</div>
    </div>
  );
}
