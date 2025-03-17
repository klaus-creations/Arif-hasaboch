import {
  SignedIn,
  SignedOut,
  SignUpButton,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import React from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full h-full flex items-center justify-between shadow-md shadow-emerald-500/[.1] bg-gray-950/[.1] px-1">
      <Link
        href={"/"}
        className="text-xl lg:text-2xl font-bol tracking-[1px] text-emerald-500 first-letter:text-2xl first-letter:font-extrabold lg:first-letter:text-3xl"
      >
        arif-hasab
      </Link>

      <div className="hidden lg:block">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <div className="flex items-center gap-2">
            <SignInButton>
              <button className="text-sm lg:text-base font-bold px-2 hover:bg-emerald-600 duration-300  py-1 rounded-md bg-emerald-500">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="text-sm lg:text-base font-bold px-2  py-1 rounded-md border-[1px] border-emerald-500">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </SignedOut>
      </div>

      <SheetTriggerC />
    </header>
  );
}

const SheetTriggerC = function () {
  return (
    <div className="block lg:hidden">
      <Sheet>
        <SheetTrigger>
          <Menu className="size-5" />
        </SheetTrigger>
        <SheetContent className="bg-[inherit] border-[inherit]">
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};
