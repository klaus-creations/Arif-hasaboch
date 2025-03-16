import { z } from "zod";

export const newThoughtSchema = z.object({
  username: z.string().min(2).max(50),
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters" })
    .max(50, { message: "Title must be at most 50 characters" }),
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
