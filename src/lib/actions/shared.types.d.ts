import { IUser } from "@/models/user.model";
import { Schema } from "mongoose";

export interface TGetAllThoughts {
  page?: number;
  pageSize?: number;
  query?: number;
}

export interface TCreateThoughts {
  title: string;
  explanation: string;
  tags: string[];
  author: Schema.Types.ObjectId | IUser;
  path: string;
}
