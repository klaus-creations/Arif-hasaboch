/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

import React from "react";
import { Badge } from "../ui/badge";
import {
  ArrowUpRight,
  Eye,
  MessageCircle,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";
// import { getTimestamp } from "@/lib/utils";
import Link from "next/link";

interface HomeThoughtDataProps {
  th: any;
}

export default function HomeThoughtData({ th }: HomeThoughtDataProps) {
  const thought = JSON.parse(th);
  const explanation =
    thought.explanation.length > 200
      ? thought.explanation.slice(0, 200) + "..."
      : thought.explanation;

  return (
    <div
      className="w-full rounded-md p-2 shadow-md shadow-emerald-500/[.1] border-[1px] bg-slate-950/[.1] border-gray-100/[.2] flex 
    flex-col gap-2"
    >
      <h2 className="text-base lg:text-xl text-gray-100 font-extrabold tracking-[1px]">
        {thought.title}
      </h2>
      <p className="text-xs lg:text-sm tracking-[1px] text-gray-500">
        {explanation}
      </p>
      <div className="w-full flex items-center gap-1">
        {thought.tags.map((tag: any) => {
          return (
            <Badge
              key={tag._id}
              className="flex items-center gap-1 p-1 bg-emerald-950 hover:bg-emerald-900"
            >
              <span>{tag.name}</span>
            </Badge>
          );
        })}
      </div>
      <div className="w-full flex justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-gray-500">
            <Image
              src={thought.author.picture || "/av.svg"}
              alt="user avatar"
              width={20}
              height={20}
              className="rounded-full"
            />
            <p className="text-xs lg:text-sm text-gray-300">
              {thought.author?.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-gray-500">
            <ThumbsUp className="size-3 lg:size-4" />
            <p className="text-xs lg:text-sm text-gray-200">
              {thought.upvotes.length}
            </p>
          </div>

          <div className="flex items-center gap-1 text-gray-500">
            <ThumbsDown className="size-3 lg:size-4" />
            <p className="text-xs lg:text-sm text-gray-200">
              {thought.downvotes.length}
            </p>
          </div>

          <div className="flex items-center gap-1 text-gray-500">
            <MessageCircle className="size-3 lg:size-4" />
            <p className="text-xs lg:text-sm text-gray-200">
              {thought.comments.length}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between">
        <div className="flex items-center gap-1 text-gray-500">
          <Eye className="size-3 lg:size-4" />
          <p className="text-xs lg:text-sm text-gray-200">{thought.views}</p>
          <p className="text-xs lg:text-sm text-gray-200">Views</p>
          {/* <p>{getTimestamp(thought.createdAt)}</p> */}
        </div>
        <Link
          href={`/thoughts/${thought._id}`}
          className="flex items-center gap-1 text-emerald-500 bg-transparent border-[1px] border-emerald-600/[.5] px-2 py-1 hover:bg-emerald-700/[.05]"
        >
          <p className="text-xs lg:text-sm text-gray-400">See More</p>
          <ArrowUpRight className="size-3 lg:size-4" />
        </Link>
      </div>
    </div>
  );
}
