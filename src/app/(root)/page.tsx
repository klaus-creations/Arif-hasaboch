import LeftHome from "@/components/Home/LeftHome";
import RightHome from "@/components/Home/RightHome";
import React from "react";

export default async function Home() {
  return (
    <div className="w-full h-full overflow-hidden flex justify-between">
      <LeftHome />
      <RightHome />
    </div>
  );
}
