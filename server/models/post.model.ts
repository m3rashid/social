import mongoose from "mongoose";
import { PostDocument } from "../types/postModel.types";

const postSchema = new mongoose.Schema(
  {
    photo: String,
    username: String,
    caption: String,
    likes: [
      {
        username: String,
      },
    ],
    comments: [
      {
        username: String,
        comment: String,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model<PostDocument>("Post", postSchema);
export default Post;
