import Link from "next/link";
import React from "react";

export default function Signin() {
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

        <button className="w-[80%] text-start text-base tracking-[1px] font-bold text-indigo-800">
          Forgot Password
        </button>
        <button
          className="text-xl font-extrabold tracking-[1px] bg-gradient-to-r from-gradient-to-bl from-indigo-500 to-indigo-800 uppercase px-3 py-1 
        text-white rounded-md hover:from-indigo-800 hover:to-indigo-500"
        >
          Login
        </button>

        <div className="w-full flex justify-around items-center">
          <span className="w-[30%] h-1 bg-gray-300"></span>
          <span className="text-xl font-bold tracking-[1px] text-gray-800">
            OR
          </span>
          <span className="w-[30%] h-1 bg-gray-300"></span>
        </div>

        <div className="w-[80%] flex items-center justify-between gap-32">
          <button className="flex items-center gap-1 border-2 border-indigo-800/[.5] px-2 py-1 rounded-md">
            <img className="size-5" src="/google.svg" alt="google svg" />
            <span className="text-base font-bold tracking-[1px] text-indigo-800">
              Google
            </span>
          </button>

          <button className="flex items-center gap-1 border-2 border-indigo-800/[.5] px-2 py-1 rounded-md">
            <img className="size-5" src="/github.svg" alt="github svg" />
            <span className="text-base font-bold tracking-[1px] text-indigo-800">
              Github
            </span>
          </button>
        </div>

        <div className="w-[80%] flex items-center gap-2">
          <p className="text-base font-bold tracking-[1px] text-gray-500">
            Don't have an Account ?
          </p>
          <Link
            href={"/auth/sign-up"}
            className="text-base font-bold tracking-[1px] text-indigo-800"
          >
            Sign up
          </Link>
        </div>
      </div>
    </form>
  );
}
