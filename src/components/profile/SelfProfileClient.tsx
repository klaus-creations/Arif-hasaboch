/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { bioValidation } from "@/validations";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addBio, removeBio } from "@/lib/actions/thought.action";
import { Input } from "../ui/input";
import { DialogTitle } from "@radix-ui/react-dialog";

interface ISelfProfile {
  data: string;
}
export default function SelfProfileClient({ data }: ISelfProfile) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pathName = usePathname();

  const userData = JSON.parse(data);

  const form = useForm<z.infer<typeof bioValidation>>({
    resolver: zodResolver(bioValidation),
    defaultValues: {
      bio: "",
    },
  });

  const onSubmit = async function (values: z.infer<typeof bioValidation>) {
    try {
      const some: any = {
        bio: values.bio,
        authorId: userData?._id,
        path: pathName,
      };
      setIsSubmitting(true);
      await addBio(some);
      setIsSubmitting(false);
      form.reset();
    } catch (error) {
      console.log(error instanceof Error ? error.message : error);
    }
  };

  const handleDeleteBio = async function () {
    try {
      await removeBio({
        authorId: userData?._id,
        path: pathName,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full flex flex-col items-start gap-4">
      <div className="text-base lg:text-xl font-bold tracking-[1px] text-gray-300">
        {userData?.bio ? (
          <div className="flex flex-col items-start gap-2">
            <p>{userData.bio}</p>
            <div className="flex gap-2 items-center">
              <Button
                onClick={handleDeleteBio}
                className="bg-red-500/[.4] px-2 py-1  border-[1px] border-emerald-500/[.4] hover:bg-red-500/[.5]"
              >
                Delete
              </Button>

              <Dialog>
                <DialogTrigger className="bg-emerald-950/[.6] px-2 py-1 rounded-md border-[1px] border-emerald-500/[.4] textxs lg:text-base">
                  Update
                </DialogTrigger>
                <DialogContent className="bg-gray-950 border-emerald-500/[.3]">
                  <DialogTitle>Update Bio</DialogTitle>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-8 py-5 w-full sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[70%] 2xl:w-[55%] flex flex-col items-start"
                    >
                      <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem className="w-full">
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
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ) : (
          <Dialog>
            <DialogTrigger className="bg-emerald-950/[.6] px-2 py-1 rounded-md border-[1px] border-emerald-500/[.4] textxs lg:text-base">
              Add Bio
            </DialogTrigger>
            <DialogContent className="bg-gray-950 border-emerald-500/[.3]">
              <DialogTitle>Add Bio</DialogTitle>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8 py-5 w-full sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[70%] 2xl:w-[55%] flex flex-col items-start"
                >
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem className="w-full">
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
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
