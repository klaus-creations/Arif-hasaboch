"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SearchIcon } from "lucide-react";
import { Button } from "../ui/button";

export const MembersInout = function () {
  const [inpValue, setInpValue] = useState("");
  const router = useRouter();

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inpValue.trim()) {
      router.push(`/members?member=${inpValue}`);
      setInpValue("");
    } else {
      router.push("/");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full sm:w-[95%] lg:w-[85%] 2xl:w-[60%] h-12 py-2 relative border-[1px] border-emerald-500/[.5] rounded-md"
    >
      <input
        className="w-full h-full rounded-md outline-none pl-3 pr-20 tracking-[1px] bg-black/[.1]"
        type="text"
        placeholder="Search for Thoughts"
        onChange={(e) => setInpValue(e.target.value)}
        value={inpValue}
      />

      <Button
        type="submit"
        aria-label="Search"
        className="absolute top-[50%] -translate-y-[50%] right-2 flex items-center gap-1 bg-emerald-700 hover:bg-emerald-800 px-2 py-1 rounded-lg"
      >
        <span className="text-xs lg:text-sm tracking-[1px]">Search</span>
        <SearchIcon className="size-4" />
      </Button>
    </form>
  );
};
