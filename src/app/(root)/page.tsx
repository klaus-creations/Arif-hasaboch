import LeftHome from "@/components/Home/LeftHome";
import RightHome from "@/components/Home/RightHome";
import React from "react";

// Correct Next.js Page Props Type
interface PageProps {
  searchParams: Record<string, string | undefined>;
}

export default function Page({ searchParams }: PageProps) {
  const data = searchParams.query ?? "";

  console.log(data);

  return (
    <div className="w-full h-full overflow-hidden flex justify-between">
      <LeftHome query={data} />
      <RightHome />
    </div>
  );
}
