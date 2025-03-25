import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { PenLine } from "lucide-react";
import HomeThoughtData from "./HomeThoughtData";
import { getAllThoughts } from "@/lib/actions/thought.action";
import { IThoughts } from "@/models/thoughts.model";
import { LeftHomeInputC } from "./LeftHomeinput";
import FeedTypeChooser from "./FeedTypeChooser";

interface IQuery {
  query: string;
}
export default async function LeftHome({ query }: IQuery) {
  const param = {
    query: query || "",
    page: 1,
    pageSize: 10,
  };
  const data = await getAllThoughts(param);
  const thoughts = data?.result as IThoughts[];

  return (
    <div className="h-full w-full lg:w-[70%] overflow-y-auto flex flex-col items-start gap-5 py-3 lg:px-6">
      <LeftHomeFirstC />
      <LeftHomeInputC />
      <FeedTypeChooser />

      <div className="w-full flex flex-col items-center gap-10 lg:gap-14 2xl:gap-15">
        {thoughts.map(function (thought: IThoughts) {
          return (
            <HomeThoughtData
              key={thought._id as string}
              th={JSON.stringify(thought)}
            />
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
