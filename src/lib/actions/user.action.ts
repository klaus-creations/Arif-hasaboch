"use server";

import connectDB from "@/config/db";
import userModel from "@/models/user.model";
import { TCreateUser, TDeleteUser, TUpdateUser } from "./shared.types";
import { revalidatePath } from "next/cache";
import thoughtsModel from "@/models/thoughts.model";

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

export async function createUser(userData: TCreateUser) {
  try {
    await connectDB();

    const newUser = await userModel.create(userData);

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(updateDatas: TUpdateUser) {
  try {
    await connectDB();

    const { clerkId, updateData, path } = updateDatas;

    await userModel.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params: TDeleteUser) {
  try {
    await connectDB();

    const { clerkId } = params;

    const user = await userModel.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    // Delete user from database
    // and questions, answers, comments, etc.

    // get user question ids
    // const userQuestionIds = await Question.find({ author: user._id}).distinct('_id');

    // delete user thoughts
    await thoughtsModel.deleteMany({ author: user._id });

    // TODO: delete user answers, comments, etc.

    const deletedUser = await userModel.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
