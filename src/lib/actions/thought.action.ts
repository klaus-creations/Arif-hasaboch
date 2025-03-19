"use server";

import connectDB from "@/config/db";
import tagModel from "@/models/tags.model";
import thoughtsModel, { IThoughts } from "@/models/thoughts.model";
import { revalidatePath } from "next/cache";
import { IDetail, TCreateThoughts, TGetAllThoughts } from "./shared.types";
import userModel from "@/models/user.model";
import commentModel from "@/models/comment.model";
import { FilterQuery } from "mongoose";

export const getAllThoughts = async function (
  data: TGetAllThoughts
): Promise<{ result: IThoughts[] }> {
  const { query, page = 1, pageSize = 10 } = data;

  const skipAmount = (page - 1) * pageSize;
  console.log(skipAmount);

  const q: FilterQuery<typeof thoughtsModel> = {};

  if (query) {
    const escapedSearchQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    q.$or = [
      { title: { $regex: new RegExp(escapedSearchQuery, "i") } },
      { content: { $regex: new RegExp(escapedSearchQuery, "i") } },
    ];
  }

  try {
    await connectDB();
    const result = await thoughtsModel
      .find(q)
      .populate({ path: "tags", model: tagModel })
      .populate({ path: "author", model: userModel })
      .sort({ createdAt: -1 });

    if (!result) {
      throw new Error("Failed to fetch thoughts.");
    }

    return { result };
  } catch (error) {
    console.error("Error fetching thoughts:", error);
    return { result: [] };
  }
};

export async function createNewThought(data: TCreateThoughts) {
  try {
    await connectDB();

    const { title, explanation, tags, author, path } = data;

    // Create new thought
    const thought = await thoughtsModel.create({
      title,
      explanation,
      author,
    });

    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await tagModel.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } }, // Case-insensitive match
        {
          $setOnInsert: { name: tag }, // Only sets if inserting a new tag
          $addToSet: { thoughts: thought._id }, // Ensures unique thought ID
        },
        { upsert: true, new: true, runValidators: true }
      );

      if (existingTag) tagDocuments.push(existingTag._id);
    }

    // Update thought with tag IDs
    await thoughtsModel.findByIdAndUpdate(thought._id, {
      $set: { tags: tagDocuments },
    });

    revalidatePath(path);
  } catch (error) {
    console.log("Error creating thought:", error);
  }
}

export const getSingleThoughts = async function (
  params: IDetail
): Promise<{ response: IThoughts }> {
  try {
    await connectDB();

    const { id } = params;

    const response = await thoughtsModel
      .findOne({ _id: id })
      .populate({ path: "tags", model: tagModel, select: "_id name" })
      .populate({ path: "author", model: userModel })
      .populate({ path: "comments", model: commentModel })
      .sort({ createdAt: -1 });

    return { response };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
