import { z } from "zod";

export const newThoughtSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters" })
    .max(200, { message: "Title must be at most 200 characters" }),
  explanation: z
    .string()
    .min(100, { message: "Explanation must be at least 100 characters" }),
  tags: z
    .array(
      z
        .string()
        .min(3, { message: "Tag must be at least 3 characters" }) // ✅ Fixed message
        .max(15, { message: "Tag must be at most 15 characters" })
    )
    .min(1, { message: "You need to insert at least one tag" })
    .max(3, { message: "You can only add up to 3 tags" }), // ✅ Fixed message
});

export const commentValidation = z.object({
  comment: z
    .string()
    .min(5, { message: "Comment must be at least 50 characters" }),
});

export const bioValidation = z.object({
  bio: z
    .string()
    .min(40, { message: "Bio must be atleast 50 characters" })
    .max(400, { message: "Bio cannot be more than 400 characters" }),
});
