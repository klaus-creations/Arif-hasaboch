/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import { IDetail } from "@/lib/actions/shared.types";
import { IThoughts } from "@/models/thoughts.model";
import HomeThoughtData from "../Home/HomeThoughtData";
import { getThoughtByauthor } from "@/lib/actions/thought.action";
import SelfProfileClient from "./SelfProfileClient";
import Image from "next/image";

interface ISelfProfile {
  data: any;
}
export default function SelfProfile({ data }: ISelfProfile) {
  const userData = JSON.parse(data);

  return (
    <div className="w-full flex flex-col items-start gap-4">
      <div className="w-full h-48 md:h-64 lg:h-72 xl:h-80 2xl:h-96 relative">
        <div
          style={{
            backgroundImage: `url('/bg.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="w-full h-full absolute inset-0"
        ></div>

        <div className="w-full h-full absolute inset-0 bg-black/[.5]"></div>

        <Image
          src={userData?.picture || "/av.svg"}
          alt="user avatar"
          width={50}
          height={50}
          className="rounded-full z-50 size-24 sm:size-32 md:size-36  absolute left-2 bottom-0 translate-y-[50%]"
        />
      </div>
      <div className="w-full flex justify-between mt-10 lg:mt-16">
        <div className="flex flex-col items-start gap-1">
          <h2 className="text-base lg:text-xl text-gray-200 font-bold tracking-[1px]">
            {userData?.name}
          </h2>

          <h3 className="text-sm lg:text-base text-gray-500 font-extrabold tracking-[1px]">
            @{userData?.username}
          </h3>
        </div>

        <div className="flex items-center  gap-2">
          <div className="flex flex-col items-center">
            <span className="text-base lg:text-xl font-bold text-gray-200">
              {userData?.followers?.length}
            </span>
            <span className="text-sm lg:text-base font-bold text-gray-400">
              Followers
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-base lg:text-xl font-bold text-gray-200">
              {userData?.followings?.length}
            </span>
            <span className="text-sm lg:text-base font-bold text-gray-400">
              Following
            </span>
          </div>
        </div>
      </div>
      <SelfProfileClient data={data} />
      <MyPosts id={userData?._id} />
    </div>
  );
}

const MyPosts = async function ({ id }: IDetail) {
  const th = (await getThoughtByauthor({ id })) || [];

  return (
    <div className="w-full flex flex-col gap-5 items-center">
      {th.map((el: IThoughts) => {
        return <HomeThoughtData key={String(el._id)} th={JSON.stringify(el)} />;
      })}
    </div>
  );
};
