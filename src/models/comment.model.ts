import { Schema, models, model, Document } from "mongoose";

export interface IComment extends Document {
  author: Schema.Types.ObjectId;
  thought: Schema.Types.ObjectId;
  comment: string;
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  createdAt: Date;
}

const commentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  thought: {
    type: Schema.Types.ObjectId,
    ref: "Thoughts",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  upvotes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  downvotes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const commentModel = models.Comments || model("Comments", commentSchema);

export default commentModel;
