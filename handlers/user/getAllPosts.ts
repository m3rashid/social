import log from "../../utils/logger";
import checkAuth from "../../middlewares/checkAuth";
import { SecureRequest } from "../../types/secureUser.types";
import { Response, Router } from "express";
import Post from "../../models/post.model";
import { UserDocument } from "../../types/userModel.types";

const router = Router();

router.post("/accept", checkAuth, async (req: SecureRequest, res: Response) => {
  log.info(`${req.method.toUpperCase()} ${req.url}`);

  const authUser = req.user as UserDocument;
  const userId = authUser._id;
  try {
    // finding the posts and check if they exist
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

router.post("/saved", checkAuth, async (req: SecureRequest, res: Response) => {
  log.info(`${req.method.toUpperCase()} ${req.url}`);

  const authUser = req.user as UserDocument;

  try {
    // finding the posts and check if they exist
    const posts = await Post.find({
      _id: { $in: authUser.saved },
    });
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
