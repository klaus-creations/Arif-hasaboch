/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { newThoughtSchema } from "@/validations";
import { z } from "zod";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";
import { createNewThought } from "@/lib/actions/thought.action";

import { useRouter } from "next/navigation";
import { useState } from "react";

export const NewThoughtForm = function ({
  mongoUserId,
}: {
  mongoUserId: string;
}) {
  const router = useRouter();
  const [isSubmittin, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof newThoughtSchema>>({
    resolver: zodResolver(newThoughtSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  });

  const onSubmit = async function (values: z.infer<typeof newThoughtSchema>) {
    try {
      setIsSubmitting(true);
      await createNewThought({
        title: values.title,
        explanation: values.explanation,
        tags: values.tags,
        author: JSON.parse(mongoUserId),
        path: "/",
      });

      setIsSubmitting(false);

      router.push("/");
    } catch (error) {
      console.log(error instanceof Error ? error.message : error);
    }
  };

  const handleInputKeydown = function (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();

      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "tag cannot more than 15 characters",
          });
        }

        if (
          !field.value?.includes(tagValue as never) &&
          field.value.length < 3
        ) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors();
          form.trigger("tags");
        }
      } else {
        form.trigger("tags");
      }
    }
  };

  const handleTagRemove = function (tag: string, field: any) {
    const newTag = field.value.filter((t: string) => t !== tag);
    form.setValue("tags", newTag);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 py-10 w-full sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[70%] 2xl:w-[55%]"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base lg:text-xl tracking-[1px]">
                Title
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Your thought title..."
                  className="border-emerald-500/[.5]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base lg:text-xl tracking-[1px]">
                Describe your thoughts
              </FormLabel>
              <FormControl>
                <textarea
                  placeholder="Your thought title..."
                  className="border-emerald-500/[.5] bg-transparent outline-none w-full border-[1px] resize-none h-72 p-2 rounded-md"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base lg:text-xl tracking-[1px]">
                Tags
              </FormLabel>
              <FormControl>
                <div>
                  <Input
                    placeholder="Your Tags..."
                    className="border-emerald-500/[.5]"
                    onKeyDown={(e) => handleInputKeydown(e, field)}
                  />
                  {field.value?.length > 0 && (
                    <div className="flex items-center gap-2 py-2">
                      {field.value.map((el: any, i) => {
                        return (
                          <Badge
                            key={i}
                            className="flex items-center gap-1 p-1 bg-emerald-700 hover:bg-emerald-800"
                          >
                            <span>{el}</span>
                            <X
                              onClick={() => handleTagRemove(el, field)}
                              className="size-3"
                            />
                          </Badge>
                        );
                      })}
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription>
                Add up to 3 tags which describes your thought
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isSubmittin}
          type="submit"
          className="bg-gradient-to-r from-emerald-500 to-emerald-700"
        >
          Create
        </Button>
      </form>
    </Form>
  );
};
