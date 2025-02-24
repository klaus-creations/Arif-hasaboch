import {
  Bell,
  Circle,
  FileQuestion,
  Home,
  SearchIcon,
  Telescope,
  Pen,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between border-b-[1px] border-b-gray-400/[.5] py-4 shadow-md shadow-gray-400/[.2]">
      <LeftNav />
      <MiddleNav />
      <RightNav />
    </header>
  );
}

const LeftNav = function () {
  return (
    <div className="flex items-center gap-3">
      <Link href={"/"} className="flex items-center gap-1  text-indigo-800">
        <Circle className="size-4" />
        <span className="text-2xl font-extrabold tracking-[1px]">
          arifHasab
        </span>
      </Link>

      <Search />
    </div>
  );
};

const MiddleNav = function () {
  return (
    <div className="flex items-center gap-4">
      <Link href={"/home"} className="flex items-center gap-1 text-base">
        <Home className="size-4" />
        <span className="text-base tracking-[1px] text-gray-950">Home</span>
      </Link>

      <Link href={"/home"} className="flex items-center gap-1 text-base">
        <Bell className="size-4" />
        <span className="text-base tracking-[1px] text-gray-950">
          Notifications
        </span>
      </Link>

      <Link href={"/home"} className="flex items-center gap-1 text-base">
        <Telescope className="size-4" />
        <span className="text-base tracking-[1px] text-gray-950">Explore</span>
      </Link>

      <Link href={"/home"} className="flex items-center gap-1 text-base">
        <FileQuestion className="size-4" />
        <span className="text-base tracking-[1px] text-gray-950">About</span>
      </Link>
    </div>
  );
};

const RightNav = function () {
  return (
    <div className="flex items-center gap-2">
      <AuthRedirect />
    </div>
  );
};

const Search = function () {
  return (
    <form className="w-72 h-8 border-[1px] border-indigo-800 rounded-lg relative">
      <SearchIcon className="size-4 text-indigo-900 absolute left-1 top-[50%] -translate-y-[50%]" />
      <input
        className="w-full h-full outline-none rounded-lg pl-7 text-gray-600 tracking-[1px]"
        placeholder="Search..."
      />
    </form>
  );
};

const AuthRedirect = function () {
  return (
    <div className="flex items-center gap-2">
      <Link
        href={"/sign-up"}
        className="text-base bg-indigo-700 hover:bg-indigo-800 duration-300  px-2 py-1 rounded-lg text-white"
      >
        Sign Up
      </Link>

      <Link
        href={"/sign-in"}
        className="text-base  border-[1px] border-indigo-700 hover:border-indigo-800 duration-300  px-2 py-1 rounded-lg text-gray-950"
      >
        Sign In
      </Link>
    </div>
  );
};
