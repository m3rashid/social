import User from "../../models/user.model";
import Post from "../../models/post.model";
import { Request, Response, Router } from "express";
import log from "../../utils/logger";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const posts = await Post.find({ user: userId });

    if (!posts) {
      return res.status(200).json({
        message: "Posts not found",
        user,
      });
    }

    return res.status(200).json({
      message: "Posts found",
      user,
      posts,
    });
  } catch (err) {
    log.error(err);

    return res.status(200).json({
      message: "Server error",
    });
  }
});

export default router;
