/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import connectDB from "@/config/db";
import userModel, { IUser } from "@/models/user.model";
import {
  IFollow,
  TCreateUser,
  TDeleteUser,
  TgetAllUsers,
  TUpdateUser,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import thoughtsModel from "@/models/thoughts.model";
import { FilterQuery } from "mongoose";

export const getUserById = async function (data: any) {
  try {
    await connectDB();
    const { userId } = data;

    const user = await userModel
      .findOne({ clerkId: userId })
      .populate({ path: "followers", model: userModel })
      .populate({
        path: "followings",
        model: userModel,
      });

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

export async function getAllUsers(data: TgetAllUsers): Promise<{
  totalUsers: IUser[];
}> {
  try {
    await connectDB();

    const { query = "", page = 1, pageSize = 10 } = data;
    const skipAmount = (page - 1) * pageSize;

    const q: FilterQuery<typeof userModel> = {};

    if (query.trim()) {
      const escapedSearchQuery = query
        .trim()
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      q.$or = [
        { name: { $regex: new RegExp(escapedSearchQuery, "i") } },
        { username: { $regex: new RegExp(escapedSearchQuery, "i") } },
      ];
    }

    const totalUsers = await userModel
      .find(q)
      .populate({ path: "followers", model: userModel })
      .sort({ createdAt: -1 })
      .skip(skipAmount)
      .limit(pageSize);

    return { totalUsers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const follow = async function ({
  creatorId,
  followerId,
  path,
}: IFollow) {
  try {
    if (creatorId === followerId) {
      throw new Error("Users cannot follow themselves.");
    }

    await connectDB();

    const creator = await userModel.findById(creatorId);
    console.log(creator);

    if (creator.followers.includes(followerId)) {
      const unfollow = await userModel.findByIdAndUpdate(creatorId, {
        $pull: { followers: followerId },
      });
      const unfollowing = await userModel.findByIdAndUpdate(followerId, {
        $pull: { followings: creatorId },
      });

      if (unfollow && unfollowing) return false;
    } else {
      const follow = await userModel.findByIdAndUpdate(creatorId, {
        $addToSet: { followers: followerId },
      });
      const following = await userModel.findByIdAndUpdate(followerId, {
        $addToSet: { followings: creatorId },
      });

      if (follow && following) return;
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
};

export const checkFollow = async function ({
  creatorId,
  followerId,
  path,
}: IFollow) {
  try {
    await connectDB();
    const data = await userModel.findById(creatorId);
    if (!data) throw new Error("user not found with this id");

    if (data?.followers.includes(followerId)) {
      return true;
    } else {
      return false;
    }

    console.log(path);
  } catch (error) {
    console.log(error);
  }
};
