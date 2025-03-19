import { NextResponse } from "next/server";
import { useSearchQueryStates } from "@/features/zustand";

export async function getQueries() {
  const queries = useSearchQueryStates.getState();
  return NextResponse.json({ queries });
}
