import LeftHome from "@/components/Home/LeftHome";
import RightHome from "@/components/Home/RightHome";
import React from "react";

// Correct Next.js Page Props Type

export default function Page() {
  return (
    <div className="w-full h-full overflow-hidden flex justify-between">
      <LeftHome />
      <RightHome />
    </div>
  );
}
