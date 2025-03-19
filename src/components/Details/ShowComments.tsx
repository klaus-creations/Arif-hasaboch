import { getTimestamp } from "@/lib/utils";
import { IComment } from "@/models/comment.model";
import userModel from "@/models/user.model";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IShowComments {
  comments: IComment[];
}
export default function ShowComments({ comments }: IShowComments) {
  return (
    <div className="w-full flex flex-col gap-3">
      {comments.length > 0 ? (
        <div className="w-full flex flex-col items-start gap-3">
          {comments.reverse().map((el, i: number) => {
            return <Comment key={i} com={el} />;
          })}
        </div>
      ) : (
        <>No comments yet</>
      )}
    </div>
  );
}

interface IComments {
  com: IComment;
}

const Comment = async function ({ com }: IComments) {
  const user = await userModel.findById(com.author);

  return (
    <div className="w-[95%] flex flex-col gap-1 border-[1px] border-emerald-500/[.2] p-3 rounded-lg ml-5">
      <p className="text-xs lg:text-base font-normal tracking-[1px] text-white">
        {com.comment}
      </p>

      <div className="w-full flex items-center gap-5 mb-2">
        <p className="text-xs text-gray-300">{getTimestamp(com.createdAt)}</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-gray-200">
            <ThumbsUp className="size-3 lg:size-4" />
            <p className="text-xs lg:text-sm text-gray-100">
              {com.upvotes.length}
            </p>
          </div>

          <div className="flex items-center gap-1 text-gray-200">
            <ThumbsDown className="size-3 lg:size-4" />
            <p className="text-xs lg:text-sm text-gray-100">
              {com.downvotes.length}
            </p>
          </div>
        </div>
      </div>
      <Link href={"/"} className="flex gap-2 items-center">
        <p className="text-xs lg:text-sm text-gray-400 font-bold tracking-[1px]">
          {user?.name}
        </p>
        <Image
          src={user?.picture}
          alt="user avatar"
          width={50}
          height={50}
          className="rounded-full size-4 lg:size-5"
        />
      </Link>
    </div>
  );
};
