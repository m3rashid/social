import log from "../../utils/logger";
import checkAuth from "../../middlewares/checkAuth";
import { SecureRequest } from "../../types/secureUser.types";
import { Response, Router } from "express";
import Post from "../../models/post.model";
import User from "../../models/user.model";

const router = Router();

router.post("/accept", checkAuth, async (req: SecureRequest, res: Response) => {
  log.info(`${req.method.toUpperCase()} ${req.url}`);

  // taking data from the request body and checking if they exist
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({
      message: "User id is required",
    });
  }

  try {
    // finding the user from the given userId and check if they exist
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    // finding posts of the user and checking if they exist
    const posts = await Post.find({ user: userId });
    if (posts.length === 0) {
      return res.status(200).json({
        message: "No posts found",
      });
    }
    // successful response
    return res.status(200).json({
      message: "Success",
      posts: posts,
    });
  } catch (err) {
    // incase of any of the above fails, return an error response
    log.error(err);
    return res.status(500).json({
      message: "Error in sending request",
    });
  }
});

export default router;
