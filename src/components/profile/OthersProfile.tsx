/* eslint-disable @typescript-eslint/no-explicit-any */
import { IDetail } from "@/lib/actions/shared.types";
import { getThoughtByauthor } from "@/lib/actions/thought.action";
import { IThoughts } from "@/models/thoughts.model";
import Image from "next/image";
import React from "react";
import HomeThoughtData from "../Home/HomeThoughtData";

interface IOtherProfile {
  data: any;
}
export default function OthersProfile({ data }: IOtherProfile) {
  console.log("other profile");
  console.log(data);
  return (
    <div className="w-full h-full overflow-y-auto flex flex-col items-start gap-5">
      <div className="flex items-center gap-4">
        <Image
          src={data?.picture}
          alt="user avatar"
          width={50}
          height={50}
          className="rounded-full size-8 lg:size-12 2xl:lg:size-14"
        />
        <p className="text-xl lg:text-2xl text-gray-200 font-extrabold tracking-[1px]">
          {data?.name}
        </p>
      </div>

      <p className="text-base lg:text-xl font-bold tracking-[1px] text-gray-300">
        {data?.bio ? data.bio : "No Bio"}
      </p>

      <OthersPosts id={data?._id} />
    </div>
  );
}

const OthersPosts = async function ({ id }: IDetail) {
  const th = (await getThoughtByauthor({ id })) || [];

  console.log("this is th");
  console.log(id);
  console.log(th);

  return (
    <div className="w-full flex flex-col gap-5 items-center">
      {th.map((el: IThoughts) => {
        return <HomeThoughtData key={String(el._id)} thought={el} />;
      })}
    </div>
  );
};
