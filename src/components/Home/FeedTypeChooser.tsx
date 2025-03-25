"use client";

import React from "react";
import { Button } from "../ui/button";

export default function FeedTypeChooser() {
  return (
    <div className="w-full flex items-center gap-3 overflow-x-auto">
      <Button className="bg-emerald-500 text-base hover:bg-emerald-600 px-2 py-1 rounded-md">
        All
      </Button>

      <Button className="border-[1px] border-emerald-500 bg-emerald-500/[.1] hover:bg-emerald-600/[.1] px-2 py-1 rounded-xl">
        Following
      </Button>
    </div>
  );
}
