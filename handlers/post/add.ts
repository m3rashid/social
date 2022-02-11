import Post from "../../models/post.model";
import log from "../../utils/logger";
import generateUploadUrl from "../../utils/upload";
import { Response, Router } from "express";
import checkAuth from "../../middlewares/checkAuth";
import { SecureRequest } from "../../types/secureUser.types";
import { UserDocument } from "../../types/userModel.types";
const router = Router();

router.get("/image", checkAuth, async (req: SecureRequest, res: Response) => {
  // this function will generate a signed url for the image upload
  log.info(`${req.method.toUpperCase()} ${req.url}`);

  try {
    // generate the url
    const url = await generateUploadUrl();
    // return the url
    return res.status(200).json({ url });
  } catch (err) {
    log.error(err);
    // error in generating the url
    return res.status(500).json({ message: err.message });
  }
});

router.post("/add", checkAuth, async (req: SecureRequest, res: Response) => {
  // this function will save the post document to the database
  const user = req.user as UserDocument;
  log.info(`${req.method.toUpperCase()} ${req.url}`);

  // validation of the post document for data required
  const { photo, caption } = req.body;
  if (!photo || !caption) {
    return res.status(400).json({ message: "Resources absent" });
  }
  // creating a new post object
  const post = new Post({
    photo: photo,
    caption: caption,
    user: user._id,
    username: user.username,
  });

  try {
    // saving the post document to the database
    const newPost = await post.save();

    // returning the post document and success response
    return res.status(200).json({
      message: "Success",
      post: newPost,
    });
  } catch (err) {
    // error in saving the post document
    log.error(err);
    return res.status(500).json({ message: err.message });
  }
});

export default router;
