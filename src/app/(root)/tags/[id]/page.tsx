import React from "react";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;
  console.log(id);
  return <div className="size-full px-5 py-1"></div>;
}
