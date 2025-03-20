import React from "react";
import Tags from "@/components/Tags/Tags";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(id);
  return (
    <div className="size-full">
      <Tags />
    </div>
  );
}
