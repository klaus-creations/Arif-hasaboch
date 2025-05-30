import { Schema, models, model, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  bio?: string;
  picture: string;
  reputation?: number;
  followers: Schema.Types.ObjectId[];
  followings: Schema.Types.ObjectId[];
  saved: Schema.Types.ObjectId[];
  joinedAt: Date;
}

const UserSchema = new Schema<IUser>({
  clerkId: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  bio: { type: String },
  picture: { type: String, required: true },
  reputation: { type: Number, default: 0 },
  saved: [{ type: Schema.Types.ObjectId, ref: "Thoughts" }],
  followers: [{ type: Schema.Types.ObjectId }],
  followings: [{ type: Schema.Types.ObjectId }],
  joinedAt: { type: Date, default: Date.now },
});

const userModel = models.User || model("User", UserSchema);

export default userModel;
