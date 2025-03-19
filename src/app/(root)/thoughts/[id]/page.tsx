import Detail from "@/components/Details/Detail";
import React from "react";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;

  return (
    <div className="size-full overflow-y-auto px-5 py-1">
      <Detail id={id} />
    </div>
  );
}
