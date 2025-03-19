import LeftHome from "@/components/Home/LeftHome";
import RightHome from "@/components/Home/RightHome";
import React from "react";

export default async function page({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const data = (await searchParams.query) || "";
  console.log(data);

  return (
    <div className="w-full h-full overflow-hidden flex justify-between">
      <LeftHome query={data} />
      <RightHome />
    </div>
  );
}
