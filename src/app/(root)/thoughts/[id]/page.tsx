import Detail from "@/components/Details/Detail";
import { increaseThoughtView } from "@/lib/actions/thought.action";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const increase = increaseThoughtView({
    thoughtId: id,
  });

  if (!increase) redirect("/");

  return (
    <div className="size-full overflow-y-auto px-5 py-1">
      <Detail id={id} />
    </div>
  );
}
