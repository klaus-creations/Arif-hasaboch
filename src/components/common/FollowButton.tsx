// @eslint-disable

"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { checkFollow, follow } from "@/lib/actions/user.action";
import Image from "next/image";

interface IFollowButton {
  creatorId: string;
  followerId: string;
  path: string;
  isFollow: boolean;
}

export default function FollowButton({
  creatorId,
  followerId,
  path,
  isFollow,
}: IFollowButton) {
  const [fl, setFl] = useState(isFollow);
  const [loading, setLoading] = useState(false);

  const handleFollow = async function () {
    setLoading(true);
    console.log(loading);

    await follow({
      creatorId: JSON.parse(creatorId),
      followerId: JSON.parse(followerId),
      path,
    });

    // Re-fetch the follow status to get the latest value
    const updatedStatus = await checkFollow({
      creatorId: JSON.parse(creatorId),
      followerId: JSON.parse(followerId),
      path,
    });

    setFl(updatedStatus ?? false);

    setLoading(false);
  };

  return (
    <form action={handleFollow}>
      {fl ? (
        <Button
          disabled={loading}
          type="submit"
          className="bg-transparent border-[1px] border-emerald-500 text-sm lg:text-base hover:border-emerald-600 tracking-[1px] text-gray-200 font-bold px-2 py-1 flex gap-2 items-center"
        >
          <span>UnFollow</span>
          {loading && (
            <Image src={"/spinner.svg"} width={10} height={10} alt="spinner" />
          )}
        </Button>
      ) : (
        <Button
          disabled={loading}
          type="submit"
          className="bg-emerald-500 text-sm lg:text-base hover:bg-emerald-600 tracking-[1px] text-gray-200 font-bold px-2 py-1"
        >
          <span>Follow</span>
          {loading && (
            <Image src={"/spinner.svg"} width={10} height={10} alt="spinner" />
          )}
        </Button>
      )}
    </form>
  );
}
