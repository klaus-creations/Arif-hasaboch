import { getAllUsers } from "@/lib/actions/user.action";
import { IUser } from "@/models/user.model";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import NoResult from "../common/NoResult";
// import FollowButton from "../common/FollowButton";
import { MembersInout } from "./MembersInput";

interface IMembers {
  member: string;
}
export default async function Members({ member }: IMembers) {
  const users = await getAllUsers({
    page: 1,
    pageSize: 10,
    query: member,
  });

  return (
    <div className="size-full flex flex-col items-start">
      <MembersFirstC />
      <MembersInout />
      {users?.totalUsers.length > 0 ? (
        <div className="size-full overflow-y-auto p-2 flex flex-col gap-3 mt-5">
          <div className="w-full flex flex-col gap-5">
            {users?.totalUsers.map((user: IUser) => {
              return (
                <Link
                  href={`/profile/${user.clerkId}`}
                  key={user.clerkId}
                  className="flex w-full items-center border-[1px] border-emerald-500/[.4] py-2 rounded-md 
                  bg-emerald-950/[.1] hover:bg-emerald-950/[.3] px-4"
                >
                  <div className="flex flex-col items-start gap-2">
                    <Image
                      src={user.picture}
                      width={100}
                      height={100}
                      className="w-12 rounded-full"
                      alt="profile picture"
                    />

                    <span className="w-[80%] text-center">
                      @{user.username}
                    </span>
                  </div>

                  {/* <div className="flex flex-col items-center gap-2">
                    <FollowButton />
                    <p className="text-sm lg:text-base text-gray-400">
                      10 Followers
                    </p>
                  </div> */}
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="w-full pt-20">
          <NoResult result="No Member Is Found" />
        </div>
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
