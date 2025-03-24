import Image from "next/image";
import React from "react";

interface INoResult {
  result: string;
}

export default function NoResult({ result }: INoResult) {
  return (
    <div className="flex flex-col items-center gap-5 w-[40%] sm:w-[30%] xl:w-[20%] 2xl:w-[10%] mx-auto mt-20">
      <Image
        src={"/no-result.svg"}
        width={400}
        height={400}
        alt="no result"
        className="w-full"
      />

      <p className="text-xl lg:text-2xl font-bold tracking-[1px] text-center">
        {result}
      </p>
    </div>
  );
}
