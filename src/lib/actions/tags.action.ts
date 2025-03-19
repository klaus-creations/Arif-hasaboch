"use server";

import connectDB from "@/config/db";
import { TGetAllTags } from "./shared.types";
import tagModel, { ITag } from "@/models/tags.model";
// import thoughtsModel from "@/models/thoughts.model";

export const getAllTags = async function (
  data: TGetAllTags
): Promise<{ response: ITag[] }> {
  console.log(data);
  try {
    await connectDB();

    const response = await tagModel.find(data);
    //   .populate({ path: "thoughts", model: thoughtsModel });

    //   .sort({ createdAt: -1 });
    return { response };
  } catch (error) {
    console.log(error);
    return { response: [] };
  }
};
