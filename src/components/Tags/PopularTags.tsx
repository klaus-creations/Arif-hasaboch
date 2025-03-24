import { getPopularTags } from "@/lib/actions/tags.action";
import Link from "next/link";
import React from "react";

import { ITag } from "@/models/tags.model";

export default async function PopularTags() {
  const popularTags = await getPopularTags();
  return (
    <div className="w-full flex flex-col gap-3">
      <h2 className="text-base lg:text-xl font-bold tracking-[1px] text-gray-100 uppercase">
        Most Popular Topics
      </h2>

      <div className="w-full flex flex-col items-start gap-3">
        {popularTags.response.map((tag: ITag) => {
          return <PopularTag key={String(tag._id)} data={tag} />;
        })}
      </div>
    </div>
  );
}

interface Prop {
  data: ITag;
}

const PopularTag = function ({ data }: Prop) {
  return (
    <Link
      className="w-[90%] flex flex-col items-start bg-emerald-950/[.1] hover:bg-emerald-950/[.2] duration-300 border-[1px] border-emerald-500/[.2] rounded-lg px-3 py-2"
      href={`/topics/${data._id}`}
    >
      <span className="">{data.name}</span>
      <span className="text-sm lg:text-xs text-gray-400">
        {data.thoughts.length} thoughts
      </span>
    </Link>
  );
};
