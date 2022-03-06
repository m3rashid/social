import { Request, Response, Router } from "express";
import log from "../../utils/logger";
import User from "../../models/user.model";
import { comparePassword } from "../../utils/auth.utils";
import { MailerData } from "../../types/mailerData.types";
import mail from "../../utils/mailer";
const router = Router();

// delete user permanently in the database
router.post("/delete", async (req: Request, res: Response) => {
  log.info(`${req.method.toUpperCase()} ${req.url}`);

  // get the user data from the request and validates, if present or not
  const { username, password } = req.body;

  if (!username || !password) {
    // username or password not present in the request
    return res.status(400).json({
      message: "Invalid data",
    });
  }

  // all data present in the request
  try {
    // find the user in the database
    const user = await User.findOne({ username: username });

    if (!user) {
      // user is not found in the database, return error
      return res.status(400).json({
        message: "No user found with the given credentials",
      });
    }

    // user is found, match the password
    const passwordMatched = comparePassword(password, user.hash, user.salt);

    if (!passwordMatched) {
      // password does not match, return error
      return res.status(401).json({
        message: "Incorrect username or password",
      });
    }

    // all set, delete the user
    await User.findOneAndDelete({ username: user.username });

    // data to send a mail to the user, that his account has been deleted
    const data: MailerData = {
      message: "Your account has been deleted, sorry to see you go",
      subject: "Sorry to see you leave social",
    };

    // send mail
    // await mail(user.email, data);

    // send successful response to the user
    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (err) {
    log.error(err);
    // if any of the above steps fails, send error response to the user
    return res.status(500).json({
      message: "Problem in removing the user",
    });
  }
});

export default router;
