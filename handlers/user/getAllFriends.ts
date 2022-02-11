import log from "../../utils/logger";
import checkAuth from "../../middlewares/checkAuth";
import { UserDocument } from "../../types/userModel.types";
import { SecureRequest } from "../../types/secureUser.types";
import { Response, Router } from "express";
import User from "../../models/user.model";

const router = Router();

router.post("/accept", checkAuth, async (req: SecureRequest, res: Response) => {
  log.info(`${req.method.toUpperCase()} ${req.url}`);

  const user = req.user as UserDocument;
  try {
    // getting the friendlist of the user
    const friendList = user.friends;
    // finding the friends from the given array of ids and checking if they exist
    const friends = await User.find({ _id: { $in: friendList } });
    if (friends.length === 0) {
      return res.status(200).json({
        message: "No friends found",
      });
    }
    // successful response
    return res.status(200).json({
      message: "Success",
      friends: friends,
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
