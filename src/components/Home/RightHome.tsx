import React from "react";
import PopularTags from "../Tags/PopularTags";

export default function RightHome() {
  return (
    <div className="h-full hidden lg:flex lg:w-[25%] overflow-y-auto flex-col items-center py-3">
      <PopularTags />
    </div>
  );
}
