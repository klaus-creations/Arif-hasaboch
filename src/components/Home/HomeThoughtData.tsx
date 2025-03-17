// "use client";

import { IThoughts } from "@/models/thoughts.model";
import { ITag } from "@/models/tags.model";
import React from "react";
import { Badge } from "../ui/badge";

interface HomeThoughtDataProps {
  thought: IThoughts;
}

export default function HomeThoughtData({ thought }: HomeThoughtDataProps) {
  const explanation =
    thought.explanation.length > 350
      ? thought.explanation.slice(0, 450) + "..."
      : thought.explanation;
  return (
    <div className="w-full rounded-md p-2 bg-emerald-950/[.2] shadow-md shadow-emerald-500/[.1] border-[1px] border-gray-100/[.2]">
      <h2 className="text-base lg:text-xl ">{thought.title}</h2>
      <p>{explanation}</p>

      <div className="w-full flex justify-between">
        <div className="flex items-center gap-1">
          {/* @ts-expect-erro */}
          {thought.tags.map((tag: any) => {
            return (
              <Badge
                key={tag.name}
                className="flex items-center gap-1 p-1 bg-emerald-950 hover:bg-emerald-900"
              >
                <span>{tag.name}</span>
              </Badge>
            );
          })}
        </div>
      </div>
    </div>
  );
}
