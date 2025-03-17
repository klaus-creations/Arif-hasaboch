"use server";

import connectDB from "@/config/db";
import tagModel from "@/models/tags.model";
import thoughtsModel from "@/models/thoughts.model";
import { revalidatePath } from "next/cache";
import { TCreateThoughts, TGetAllThoughts } from "./shared.types";
import userModel from "@/models/user.model";

export const getAllThoughts = async function (data: TGetAllThoughts) {
  try {
    await connectDB();
    const result = await thoughtsModel
      .find({})
      .populate({ path: "tags", model: tagModel }) // Ensure tags are fully populated
      .populate({ path: "author", model: userModel });

    if (!result) {
      throw new Error("Failed to fetch thoughts.");
    }

    return { result }; // Wrap the response in an object
  } catch (error) {
    console.error("Error fetching thoughts:", error);
    return { result: [] }; // Ensure it always returns a predictable structure
  }
};

export async function createNewThought(data: TCreateThoughts) {
  try {
    await connectDB();

    const { title, explanation, tags, author, path } = data;

    const thought = await thoughtsModel.create({
      title,
      explanation,
      author,
    });
    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await tagModel.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { toughts: thought._id } },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag._id);
    }

    await thoughtsModel.findByIdAndUpdate(thought._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    // Create an interaction record for the user's ask_thought action
    // await Interaction.create({
    //   user: author,
    //   action: "ask_question",
    //   question: question._id,
    //   tags: tagDocuments,
    // })

    // Increment author's reputation by +5 for creating a question
    // await User.findByIdAndUpdate(author, { $inc: { reputation: 5 }})

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
