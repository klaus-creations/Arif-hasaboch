import LeftHome from "@/components/Home/LeftHome";
import RightHome from "@/components/Home/RightHome";
import React from "react";

export default function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const data =
    typeof searchParams?.query === "string" ? searchParams.query : "";

  console.log(data);

  return (
    <div className="w-full h-full overflow-hidden flex justify-between">
      <LeftHome query={data} />
      <RightHome />
    </div>
  );
}
