import React from "react";
import Tags from "@/components/Tags/Tags";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ topic: string }>;
}) {
  const { topic } = await searchParams;

  return (
    <div className="size-full">
      <Tags topic={topic} />
    </div>
  );
}
