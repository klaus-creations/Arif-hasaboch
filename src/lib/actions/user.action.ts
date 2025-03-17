"use server";

import connectDB from "@/config/db";
import userModel from "@/models/user.model";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getUserById = async function (data: any) {
  try {
    connectDB();
    const { userId } = data;

    const user = await userModel.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.log(error);
  }
};
