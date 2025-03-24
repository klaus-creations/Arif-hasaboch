import Members from "@/components/members/Members";
import React from "react";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ member: string }>;
}) {
  const { member } = await searchParams;
  return (
    <div className="size-full">
      <Members member={member} />
    </div>
  );
}
