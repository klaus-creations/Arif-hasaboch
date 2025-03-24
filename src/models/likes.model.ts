import { Schema, model, models, Document } from "mongoose";

export interface ILikes extends Document {
  thought: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  isPost: boolean;
  createdAt: Date;
}

const LikesSchema = new Schema({
  thought: { type: Schema.Types.ObjectId, ref: "Thoughts", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },

  createdAt: { type: Date, default: Date.now },
});

const likesModel = models.Upvote || model("Upvote", LikesSchema);
export default likesModel;
