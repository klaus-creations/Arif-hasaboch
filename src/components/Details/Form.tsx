/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { commentValidation } from "@/validations";
import { z } from "zod";

import { useState } from "react";
import { createComment } from "@/lib/actions/comment.action";
import { usePathname } from "next/navigation";

interface INewThoughtForm {
  userId: string;
  thoughtId: string;
}
export const NewThoughtCommentForm = function ({
  userId,
  thoughtId,
}: INewThoughtForm) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pathName = usePathname();

  const form = useForm<z.infer<typeof commentValidation>>({
    resolver: zodResolver(commentValidation),
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = async function (values: z.infer<typeof commentValidation>) {
    try {
      const some: any = {
        author: JSON.parse(userId),
        comment: values.comment,
        thought: JSON.parse(thoughtId),
        path: pathName,
      };
      setIsSubmitting(true);
      await createComment(some);
      setIsSubmitting(false);
      form.reset();
    } catch (error) {
      console.log(error instanceof Error ? error.message : error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 py-5 w-full sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[70%] 2xl:w-[55%] flex flex-col items-start"
      >
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-base lg:text-xl tracking-[1px]">
                Comment
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your comment..."
                  className="border-emerald-500/[.5] w-full"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={isSubmitting}
          type="submit"
          className="bg-gradient-to-r from-emerald-500 to-emerald-700"
        >
          Comment
        </Button>
      </form>
    </Form>
  );
};
