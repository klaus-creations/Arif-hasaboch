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

export interface TCreateUser {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
}

export interface TUpdateUser {
  clerkId: string;
  updateData: Partial<IUser>;
  path: string;
}

export interface TDeleteUser {
  clerkId: string;
}
