import OthersProfile from "@/components/profile/OthersProfile";
import SelfProfile from "@/components/profile/SelfProfile";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page({ params }: { params: { id: string } }) {
  const id = await params;
  const authData = await auth();

  if (!authData?.userId) redirect("/");

  const user = await getUserById({ userId: id.id });
  if (!user) redirect("/");

  return (
    <div className="size-full overflow-y-auto px-5 py-1">
      {id.id === authData.userId ? (
        <SelfProfile data={JSON.stringify(user)} />
      ) : (
        <OthersProfile data={JSON.stringify(user)} />
      )}
    </div>
  );
}
