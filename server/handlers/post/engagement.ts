import log from "../../utils/logger";
import checkAuth from "../../middlewares/checkAuth";
import { UserDocument } from "../../types/userModel.types";
import { SecureRequest } from "../../types/secureUser.types";
import { Response, Router } from "express";
import Post from "../../models/post.model";
const router = Router();

router.post("/like", checkAuth, async (req: SecureRequest, res: Response) => {
  log.info(`${req.method.toUpperCase()} ${req.url}`);

  const { username } = req.user as UserDocument;
  // getting data from the request body and checking if it is valid
  const { postId } = req.body;
  if (!postId) {
    return res.status(400).json({
      message: "Invalid Data",
    });
  }

  try {
    // finding the post to update and checking if it exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(200).json({
        message: "Post not found",
      });
    }

    // updating the like and saving the post
    post.likes.push({ username: username });
    post.save();

    // successful response
    return res.status(200).json({
      message: "Like added",
    });
  } catch (err) {
    // incase of any of the above fails, return an error response
    log.error(err);
    return res.status(500).json({
      message: "Error in sending request",
    });
  }
});

router.post(
  "/comment",
  checkAuth,
  async (req: SecureRequest, res: Response) => {
    log.info(`${req.method.toUpperCase()} ${req.url}`);

    const { username } = req.user as UserDocument;
    // getting data from the request body and checking if it is valid
    const { postId, comment } = req.body;
    if (!postId) {
      return res.status(400).json({
        message: "Invalid Data",
      });
    }

    try {
      // finding the post to update and checking if it exists
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(400).json({
          message: "Post not found",
        });
      }

      // updating the comment and saving the post
      post.comments.push({
        username: username,
        comment: comment,
      });
      post.save();

      return res.status(200).json({
        message: "Comment added",
      });
    } catch (err) {
      // incase of any of the above fails, return an error response
      log.error(err);
      return res.status(500).json({
        message: "Error in sending request",
      });
    }
  }
);

router.post("/save", checkAuth, async (req: SecureRequest, res: Response) => {
  log.info(`${req.method.toUpperCase()} ${req.url}`);

  const user = req.user as UserDocument;

  // getting data from the request body and checking if it is valid
  const { postId } = req.body;
  if (!postId) {
    return res.status(400).json({
      message: "Invalid Data",
    });
  }

  try {
    // finding the post to update and checking if it exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).json({
        message: "Post not found",
      });
    }
    // updating the saved and saving the post
    user.saved.push(post);
    user.save();

    return res.status(200).json({
      message: "Post Saved",
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
