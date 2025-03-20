/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import { IDetail } from "@/lib/actions/shared.types";
import { IThoughts } from "@/models/thoughts.model";
import HomeThoughtData from "../Home/HomeThoughtData";
import { getThoughtByauthor } from "@/lib/actions/thought.action";
import SelfProfileClient from "./SelfProfileClient";

interface ISelfProfile {
  data: any;
}
export default function SelfProfile({ data }: ISelfProfile) {
  const userData = JSON.parse(data);

  return (
    <div className="w-full flex flex-col items-start gap-4">
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
