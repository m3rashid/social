import { config } from "dotenv";
config();
import express from "express";
import mongoose from "mongoose";
import log from "./utils/logger";

import catchAll from "./handlers/catchAll";
import cors from "cors";

let corsOptions: { origin: string; credentials: boolean };
let connectionString: string;

if (process.env.NODE_ENV === "prod") {
  // TODO: add prod origin
  corsOptions = { origin: "http://localhost:3000", credentials: true };
  connectionString = process.env.MONGO_URI;
} else {
  corsOptions = { origin: "http://localhost:3000", credentials: true };
  connectionString = "mongodb://localhost/social";
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

const connect = async () => {
  // connection with the database is necessary, so, if the connection is not successful, the server will not start
  try {
    await mongoose.connect(connectionString);
    log.info("Connected to the database");
  } catch (error) {
    log.error("Could not connect to the database \n" + error);
    process.exit(1);
  }
};

import {
  deleteUser,
  forgotPassword,
  login,
  register,
  getUser,
  getAllFriends,
  getUserPosts,
  update,
} from "./handlers/user";
import { addPost, getPost, deletePost, engagements } from "./handlers/post";
import { getFriends, getOtherUser, getPosts } from "./handlers/otherUsers";
import { sendRequest, acceptRequest } from "./handlers/connections";

const port = process.env.PORT || 5000;
app.listen(port, async () => {
  // awaiting the database connection
  await connect();
  log.info(`Server Running at http://localhost:${port}`);

  // route handler middlewares
  app.use("/user", getUser);
  app.use("/user", login);
  app.use("/user", register);
  app.use("/user", deleteUser);
  app.use("/user", forgotPassword);
  app.use("/user", getAllFriends);
  app.use("/user", getUserPosts);
  app.use("/user", update);

  app.use("/other", getOtherUser);
  app.use("/other", getFriends);
  app.use("/other", getPosts);

  app.use("/post", getPost);
  app.use("/post", addPost);
  app.use("/post", deletePost);
  app.use("/post", engagements);

  app.use("/connection", sendRequest);
  app.use("/connection", acceptRequest);

  app.use("*", catchAll); // to be put at the end
});
