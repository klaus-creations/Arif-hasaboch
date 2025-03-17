import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { PenLine, SearchIcon } from "lucide-react";
import HomeThoughtData from "./HomeThoughtData";
import { getAllThoughts } from "@/lib/actions/thought.action";
import { IThoughts } from "@/models/thoughts.model";

export default async function LeftHome() {
  const data = await getAllThoughts({});
  const thoughts = data?.result as IThoughts[];

  return (
    <div className="h-full w-[70%] bg-emerald-500/[.01] overflow-y-auto flex flex-col items-start gap-5 py-3 px-6">
      <LeftHomeFirstC />
      <LeftHomeInputC />
      <div className="w-full flex flex-col items-center gap-10 lg:gap-14 2xl:gap-15">
        {thoughts.map(function (thought: IThoughts) {
          return (
            <HomeThoughtData key={thought._id as string} thought={thought} />
          );
        })}
      </div>
    </div>
  );
}

const LeftHomeFirstC = function () {
  return (
    <div className="w-full flex items-center justify-between">
      <h1 className="text-xl lg:text-2xl font-extrabold tracking-[1px] uppercase">
        What People Think
      </h1>

      <Link href={"/new-thoughts"}>
        <Button className="px-2 py-1 bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center gap-1">
          <span className="tracking-[1px] text-xs ">New Idea</span>
          <PenLine className="size-4" />
        </Button>
      </Link>
    </div>
  );
};

const LeftHomeInputC = function () {
  return (
    <form className="w-full sm:w-[95%] lg:w-[85%] 2xl:w-[60%] h-12 relative">
      <input
        className="w-full h-full border-[1px] border-emerald-500/[.5] bg-black/[.1] rounded-md outline-none pl-3 pr-20 tracking-[1px]"
        type="text"
        placeholder="Search for Thoughts"
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
