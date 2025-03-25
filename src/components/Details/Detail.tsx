/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSingleThoughts } from "@/lib/actions/thought.action";
import { getTimestamp } from "@/lib/utils";
import { Eye, MessageCircle, ThumbsDown, ThumbsUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { NewThoughtCommentForm } from "./Form";
import { redirect } from "next/navigation";
import ShowComments from "./ShowComments";
import { Badge } from "../ui/badge";
import FollowButton from "../common/FollowButton";
import { auth } from "@clerk/nextjs/server";
import { checkFollow, getUserById } from "@/lib/actions/user.action";

interface IDetailParam {
  id: string;
}

export default async function Detail({ id }: IDetailParam) {
  let detail: any;
  try {
    detail = await getSingleThoughts({ id });
  } catch (error) {
    console.error("Error fetching thought:", error);
    redirect("/");
  }

  if (!detail) {
    redirect("/");
  }

  return (
    <div className="w-full flex flex-col items-start gap-4">
      <UserInfoDetail author={detail?.response} />
      <ThoughtDetail
        title={detail?.response.title}
        description={detail?.response.explanation}
        time={detail?.response.createdAt}
        like={detail?.response.upvotes}
        dislike={detail?.response.downvotes}
        comment={detail?.response.comments}
        tags={detail?.response.tags}
        view={detail?.response.views}
      />

      <NewThoughtCommentForm
        userId={JSON.stringify(detail?.response.author._id)}
        thoughtId={JSON.stringify(detail?.response._id)}
      />

      <ShowComments comments={detail.response.comments} />
    </div>
  );
}

interface ITitDesc {
  title: string;
  description: string;
  time: any;
  like: any;
  dislike: any;
  comment: any;
  tags: any;
  view: number;
}

const ThoughtDetail = function ({
  title,
  description,
  time,
  like,
  dislike,
  comment,
  tags,
  view,
}: ITitDesc) {
  return (
    <div className="w-full flex flex-col gap-2 items-start">
      <h2 className="text-base lg:text-xl font-bold tracking-[1px]">{title}</h2>

      <div className="w-full flex items-center gap-1">
        {tags.map((tag: any) => {
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
      <p className="text-xs lg:text-base font-bold tracking-[1px] text-gray-500">
        {description}
      </p>

      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-1 text-gray-200">
          <Eye className="size-3 lg:size-4" />
          <p className="text-xs lg:text-sm text-gray-100">{view}</p>
          <p className="text-xs lg:text-sm text-gray-100">Views</p>
          <p className="text-xs text-gray-300">{getTimestamp(time)}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-gray-200">
            <ThumbsUp className="size-3 lg:size-4" />
            <p className="text-xs lg:text-sm text-gray-100">{like.length}</p>
          </div>

          <div className="flex items-center gap-1 text-gray-200">
            <ThumbsDown className="size-3 lg:size-4" />
            <p className="text-xs lg:text-sm text-gray-100">{dislike.length}</p>
          </div>

          <div className="flex items-center gap-1 text-gray-200">
            <MessageCircle className="size-3 lg:size-4" />
            <p className="text-xs lg:text-sm text-gray-100">{comment.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface IUserInfo {
  author: any;
}

const UserInfoDetail = async function ({ author }: IUserInfo) {
  const { userId } = await auth();
  const user = await getUserById({ userId });
  console.log("From detail");
  console.log(user);
  if (!user) redirect("/");

  const isFollow = await checkFollow({
    creatorId: author?.author._id,
    followerId: user._id,
    path: `/thoughts/${author._id}`,
  });

  return (
    <div className="w-full flex gap-4 items-center">
      <Link
        href={`/profile/${author.clerkId}`}
        className="flex gap-2 items-center"
      >
        <Image
          src={author.author.picture}
          alt="user avatar"
          width={70}
          height={70}
          className="rounded-full size-8 lg:size-10"
        />
        <p className="text-base lg:text-xl text-gray-200 font-bold tracking-[1px]">
          {author?.author?.name}
        </p>
      </Link>

      {userId && (
        <FollowButton
          isFollow={isFollow || false}
          creatorId={JSON.stringify(author?.author._id)}
          followerId={JSON.stringify(user._id)}
          path={`/thoughts/${author._id}`}
        />
      )}
    </div>
  );
};
