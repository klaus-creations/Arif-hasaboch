import { getAllTags } from "@/lib/actions/tags.action";
import { ITag } from "@/models/tags.model";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function Tags() {
  const tags = await getAllTags({});

  return (
    <div className="size-full flex items-center justify-center">
      {tags.response.length > 0 ? (
        <div className="size-full overflow-y-auto p-2 flex flex-col gap-3">
          <MembersFirstC />
          <MembersInputC />
          <div className="w-full flex flex-wrap gap-5">
            {tags?.response.map((tag: ITag, i: number) => {
              return (
                <Link
                  href={"/"}
                  key={i}
                  className="flex items-start flex-col w-[90%]  border-[1px] border-emerald-500/[.4] rounded-md bg-gray-800/[.7] hover:bg-emerald-900/[.1] px-2 py-3"
                >
                  <span className="text-emerald-500 px-2 py-1 text-base lg:text-xl font-extrabold tracking-[1px]">
                    {tag.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="">No Member Is Found</p>
      )}
    </div>
  );
}

const MembersFirstC = function () {
  return (
    <div className="w-full flex items-center justify-between">
      <h1 className="text-xl lg:text-2xl font-extrabold tracking-[1px">
        Members
      </h1>
    </div>
  );
};

const MembersInputC = function () {
  return (
    <form className="w-full sm:w-[95%] lg:w-[85%] 2xl:w-[60%] h-12 relative border-[1px] border-emerald-500/[.5] rounded-md">
      <input
        className="w-full h-full  rounded-md outline-none pl-3 pr-20 tracking-[1px] bg-black/[.1]"
        type="text"
        placeholder="Search Members"
      />

      <button
        type="button"
        className="absolute top-[50%] -translate-y-[50%] right-2 flex items-center gap-1 bg-emerald-700 px-2 py-1 rounded-lg"
      >
        <span className="text-xs lg:text-sm tracking-[1px]">Search</span>
        <SearchIcon className="size-4" />
      </button>
    </form>
  );
};
