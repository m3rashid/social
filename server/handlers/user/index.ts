import deleteUser from "./delete";
import forgotPassword from "./forgot-password";
import login from "./login";
import register from "./register";
import getAllFriends from "./getAllFriends";
import getUserPosts from "./getAllPosts";
import { SecureRequest } from "../../types/secureUser.types";
import { Response, Router } from "express";
import log from "../../utils/logger";
import checkAuth from "../../middlewares/checkAuth";
import { UserDocument } from "../../types/userModel.types";
import update from "./update";
const getUser = Router();

// getting the user from the token (if there exists one)
getUser.get("/", checkAuth, async (req: SecureRequest, res: Response) => {
  log.info(`${req.method.toUpperCase()} ${req.url}`);

  const user = req.user as UserDocument;

  // token has expired, or is invalid, or not present
  if (!user) {
    return res.status(400).json({
      message: "No user found with the given credentials",
    });
  }

  // successful response
  return res.status(200).json({
    message: "User loaded successfully",
    user,
  });
});

export {
  deleteUser,
  forgotPassword,
  login,
  register,
  getUser,
  getAllFriends,
  getUserPosts,
  update,
};
