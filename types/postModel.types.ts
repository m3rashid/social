import mongoose from "mongoose";
import { UserDocument } from "./userModel.types";

export interface Likes {
  username: string;
}

export interface PostInput extends mongoose.Document {
  photo: string;
  username: string;
  caption: string;
  likes: Likes[];
  comments: Comments[];
  user: UserDocument;
}

export interface Comments {
  username: string;
  comment: string;
}

export interface PostDocument extends PostInput {
  createdAt: Date;
  updatedAt: Date;
}
