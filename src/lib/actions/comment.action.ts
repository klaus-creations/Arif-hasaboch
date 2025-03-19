/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import connectDB from "@/config/db";
import { IGetThoughtsComment } from "./shared.types";
import commentModel from "@/models/comment.model";
import thoughtsModel from "@/models/thoughts.model";
import { revalidatePath } from "next/cache";

export const createComment = async function (data: any) {
  console.log("hello world");
  try {
    await connectDB();
    const { author, thought, comment, path } = data;

    console.log(data);

    const response = await commentModel.create({
      author,
      thought,
      comment,
    });

    await thoughtsModel.findByIdAndUpdate(thought, {
      $push: { comments: response._id },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
};

export const getThoghtsComment = async function ({
  thoughtId,
}: IGetThoughtsComment) {
  try {
    await connectDB();

    const response = await commentModel
      .find({ _id: thoughtId })
      .sort({ createdAt: -1 });

    return response;
  } catch (error) {
    console.log(error);
  }
};
