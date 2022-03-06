import mongoose from "mongoose";
import { PostDocument } from "./postModel.types";

export interface UserInput extends mongoose.Document {
  username: string;
  name?: string;
  password?: string;
  confirmPassword?: string;
  otp?: number;
  email: string;
}

export interface UserDocument extends UserInput {
  dob?: Date;
  hash: string;
  salt: string;
  avatar?: string;
  bio?: string;
  websiteUrl?: string;
  friends?: UserDocument[];
  sentFriendRequests?: UserDocument[];
  receivedFriendRequests?: UserDocument[];
  saved?: PostDocument[];
  createdAt?: Date;
  updatedAt?: Date;
}
