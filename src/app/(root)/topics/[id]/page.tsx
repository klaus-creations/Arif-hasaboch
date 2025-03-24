import TagDetail from "@/components/Tags/TagDetail";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="size-full">
      <TagDetail tagId={id} />;
    </div>
  );
}
