"use server";

import connectDB from "@/config/db";
import tagModel from "@/models/tags.model";
import thoughtsModel from "@/models/thoughts.model";
import { revalidatePath } from "next/cache";

export async function createNewThought(params: any) {
  try {
    await connectDB();

    const { title, explanation, tags, author, path } = params;

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
