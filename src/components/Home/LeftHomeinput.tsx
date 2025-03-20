"use client";

import { useSearchQueryStates } from "@/features/zustand";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { SearchIcon } from "lucide-react";

export const LeftHomeInputC = function () {
  const { thoughtQuery, setThoughtQuery } = useSearchQueryStates();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("query") || "";
    setThoughtQuery(query);
  }, [searchParams, setThoughtQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setThoughtQuery(newQuery);

    if (newQuery.trim()) {
      router.push(`/?query=${newQuery}`);
    } else {
      router.push("/", { scroll: false });
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    if (thoughtQuery.trim()) {
      router.push(`/?query=${thoughtQuery}`);
    } else {
      router.push("/", { scroll: false });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full sm:w-[95%] lg:w-[85%] 2xl:w-[60%] h-12 py-2 relative border-[1px] border-emerald-500/[.5] rounded-md"
    >
      <input
        value={thoughtQuery}
        onChange={handleSearch}
        className="w-full h-full rounded-md outline-none pl-3 pr-20 tracking-[1px] bg-black/[.1]"
        type="text"
        placeholder="Search for Thoughts"
      />

      <button
        type="submit"
        aria-label="Search"
        className="absolute top-[50%] -translate-y-[50%] right-2 flex items-center gap-1 bg-emerald-700 px-2 py-1 rounded-lg"
      >
        <span className="text-xs lg:text-sm tracking-[1px]">Search</span>
        <SearchIcon className="size-4" />
      </button>
    </form>
  );
};
