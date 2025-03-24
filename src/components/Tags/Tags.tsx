import { getAllTags } from "@/lib/actions/tags.action";
import { ITag } from "@/models/tags.model";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { TopicsInputC } from "./TagINput";
import NoResult from "../common/NoResult";

interface ITopics {
  topic: string;
}

export default async function Tags({ topic }: ITopics) {
  const tags = await getAllTags({
    page: 1,
    pageSize: 10,
    query: topic,
  });

  if (!tags) redirect("/");

  return (
    <div className="size-full flex-col items-start gap-2">
      <TopicsFirstC size={tags.response.length} />
      <TopicsInputC />
      {tags.response.length > 0 ? (
        <div className="size-full overflow-y-auto p-2 flex flex-col gap-3 pt-6">
          <div className="w-full flex flex-wrap gap-5">
            {tags.response.length > 0 ? (
              tags?.response.map((tag: ITag, i: number) => {
                return (
                  <Link
                    href={`/tags/${tag._id}`}
                    key={i}
                    className="flex items-start flex-col w-[90%]  border-[1px] border-emerald-500/[.2] rounded-md bg-gray-800/[.1] hover:bg-emerald-900/[.1] px-2 py-3"
                  >
                    <span className="text-emerald-500 py-1 text-sm lg:text-base font-bold tracking-[1px]">
                      {tag.name}
                    </span>

                    <div className="flex items-center gap-1 text-gray-500">
                      <span>{tag.thoughts.length}</span>
                      <span>
                        {tag.thoughts.length > 1 ? "thoughts" : "thought"}
                      </span>
                    </div>
                  </Link>
                );
              })
            ) : (
              <p>No Tags Created Yet</p>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full pt-20">
          <NoResult result="No Topic Is Found" />
        </div>
      )}
    </div>
  );
}

interface ITopicsFirstC {
  size: number;
}

const TopicsFirstC = function ({ size }: ITopicsFirstC) {
  return (
    <div className="w-full flex items-center justify-between">
      <h1 className="text-xl lg:text-2xl font-extrabold tracking-[1px">
        Topics ( {size} )
      </h1>
    </div>
  );
};
