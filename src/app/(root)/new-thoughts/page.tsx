import { NewThoughtForm } from "@/components/new_thoughts/Form";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
  // const { userId } = auth();
  const userId = "12345";

  const userMongo = await getUserById({ userId });

  if (!userId) redirect("/sign-in");
  return (
    <div className="w-full flex flex-col items-center">
      <NewThoughtForm mongoUserId={JSON.stringify(userMongo._id)} />
    </div>
  );
}
