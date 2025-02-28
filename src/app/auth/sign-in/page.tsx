import React from "react";

export default function page() {
  return (
    <form className="w-[95%] md:w-[90%] lg:w-[85%] xl:w-[80%] 2xl:w-[70%] mx-auto flex justify-center">
      <div className="w-[80%] flex flex-col items-center bg-indigo-950/[.1] mt-10 py-5 gap-3">
        <h2 className="text-xl lg:text-2xl font-extrabold tracking-[1px] bg-gradient-to-r from-indigo-500 to-indigo-800 uppercase text-transparent bg-clip-text">
          Login to your Account
        </h2>

        <div className="w-[95%] md:w-[90%] lg:w-[80%] flex flex-col items-start gap-1">
          <label className="text-base font-bold tracking-[1px] text-gray-700">
            Email Address
          </label>

          <input
            className="w-full h-10 outline-none border-[1px] border-indigo-800 rounded-lg px-3 bg-black/[.05] placeholder:text-gray-500"
            placeholder="Enter Your Email Address"
          />
        </div>

        <div className="w-[95%] md:w-[90%] lg:w-[80%] flex flex-col items-start gap-1">
          <label className="text-base font-bold tracking-[1px] text-gray-700">
            Password
          </label>

          <input
            className="w-full h-10 outline-none border-[1px] border-indigo-800 rounded-lg px-3 bg-black/[.05] placeholder:text-gray-500"
            placeholder="Enter Your Password"
          />
        </div>

        <button
          className="text-xl font-extrabold tracking-[1px] bg-gradient-to-r from-gradient-to-r from-indigo-500 to-indigo-800 uppercase px-3 py-1 
        text-white rounded-md"
        >
          Login
        </button>
      </div>
    </form>
  );
}
