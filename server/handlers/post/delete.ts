import log from "../../utils/logger";
import checkAuth from "../../middlewares/checkAuth";
import { SecureRequest } from "../../types/secureUser.types";
import Post from "../../models/post.model";
import { Response, Router } from "express";
import { UserDocument } from "../../types/userModel.types";
const router = Router();

router.post("/delete", checkAuth, async (req: SecureRequest, res: Response) => {
  // this function will delete the post document from the database
  log.info(`${req.method.toUpperCase()} ${req.url}`);

  // validation of the post document for data required
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({
      message: "Resources absent",
    });
  }
  // taking user from the request object as UserDocument
  const user = req.user as UserDocument;

  try {
    // finding if the post document exists
    const post = await Post.findById(id);
    if (!post) {
      // post does not exist, return error
      return res.status(404).json({
        message: "Post not found",
      });
    }
    // check for username match
    if (post.username !== user.username) {
      // username does not match, return error
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    // remove the post document from the database
    await post.remove();
    return res.status(200).json({
      // post document deleted successfully
      message: "Success",
    });
  } catch (err) {
    log.error(err);
    // error in deleting the post document
    return res.status(500).json({
      message: err.message,
    });
  }
});

export default router;
