import Post from "../../models/post.model";
import { Response, Router } from "express";
import checkAuth from "../../middlewares/checkAuth";
import { SecureRequest } from "../../types/secureUser.types";
import { PostDocument } from "../../types/postModel.types";
import log from "../../utils/logger";
const router = Router();

router.get("/", checkAuth, async (req: SecureRequest, res: Response) => {
  // getting single or all the posts from the database
  log.info(`${req.method.toUpperCase()} ${req.url}`);
  // taking values from the request object
  const { id } = req.body;
  let posts: PostDocument | PostDocument[];
  try {
    if (!id) {
      // if no id is present, get all the posts
      posts = await Post.find({});
    } else {
      // if id is present, get the post with the id
      posts = await Post.findById(id);
    }

    if (!posts) {
      // if no posts are found
      return res.status(200).json({
        message: "Posts not found",
      });
    }
    // if posts are found, return the posts
    return res.status(200).json({
      message: "Posts found",
      posts,
    });
  } catch (err) {
    log.error(err);
    // error in finding the posts
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

export default router;
