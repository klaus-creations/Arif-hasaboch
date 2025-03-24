/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { redirect } from "next/navigation";
import { getTagById } from "@/lib/actions/tags.action";
import HomeThoughtData from "../Home/HomeThoughtData";

interface ITagDetail {
  tagId: string;
}
export default async function TagDetail({ tagId }: ITagDetail) {
  const { response } = await getTagById(tagId);

  if (!response) redirect("/tags");
  return (
    <div className="size-full p-4 flex flex-col items-start overflow-y-auto">
      <h2 className="text-gray-300 text-xl lg:text-2xl tracking-[1px] font-bold">
        {response.name}
      </h2>

      <p className="text-base lg:text-xl tracking-[1px] text-gray-500">
        These are thoughts under the {response.name} tag
      </p>

      <div className="w-full py-4 flex items-center justify-center">
        {response?.thoughts.length === 0 ? (
          <p> No Posts In This Tag </p>
        ) : (
          <div>
            {response?.thoughts.map((thought: any) => {
              return (
                <HomeThoughtData
                  key={thought._id}
                  th={JSON.stringify(thought)}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
