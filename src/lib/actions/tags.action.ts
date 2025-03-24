"use server";

import connectDB from "@/config/db";
import { TGetAllTags } from "./shared.types";
import tagModel, { ITag } from "@/models/tags.model";
import thoughtsModel from "@/models/thoughts.model";
import { FilterQuery } from "mongoose";
// import thoughtsModel from "@/models/thoughts.model";

export const getAllTags = async function (
  data: TGetAllTags
): Promise<{ response: ITag[] }> {
  console.log(data);
  const { query = "", page = 1, pageSize = 10 } = data;
  const skipAmount = (page - 1) * pageSize;

  const q: FilterQuery<typeof thoughtsModel> = {};

  if (query.trim()) {
    const escapedSearchQuery = query
      .trim()
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    q.$or = [{ name: { $regex: escapedSearchQuery, $options: "i" } }];
  }
  try {
    await connectDB();

    const response = await tagModel
      .find(q)
      .populate({ path: "thoughts", model: thoughtsModel })
      .sort({ createdAt: -1 })
      .skip(skipAmount)
      .limit(pageSize);
    return { response };
  } catch (error) {
    console.log(error);
    return { response: [] };
  }
};

export const getPopularTags = async function (): Promise<{ response: ITag[] }> {
  try {
    await connectDB();

    const response = await tagModel
      .find()
      .populate({ path: "thoughts", model: thoughtsModel })
      .sort({ thoughts: -1 })
      .limit(10);

    return { response };
  } catch (error) {
    console.log(error);
    return { response: [] };
  }
};

export const getTagById = async function (
  tagId: string
): Promise<{ response: ITag | null }> {
  try {
    await connectDB();

    const response = await tagModel
      .findById(tagId)
      .populate({ path: "thoughts", model: thoughtsModel });

    return { response };
  } catch (error) {
    console.log(error);
    return { response: null };
  }
};
