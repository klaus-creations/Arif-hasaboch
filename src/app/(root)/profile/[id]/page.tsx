import OthersProfile from "@/components/profile/OthersProfile";
import SelfProfile from "@/components/profile/SelfProfile";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const { userId: clerkId } = await auth();

  const user = await getUserById({ userId: id });
  if (!user) redirect("/");

  return (
    <div className="size-full overflow-y-auto px-5 py-1">
      {id === clerkId ? (
        <SelfProfile data={user} />
      ) : (
        <OthersProfile data={user} />
      )}
    </div>
  );
}
