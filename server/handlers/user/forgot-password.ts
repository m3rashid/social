import { Request, Response, Router } from "express";
import { MailerData } from "../../types/mailerData.types";
import { DemoUser, ForgotUser } from "../../types/demoUser.types";
import mail from "../../utils/mailer";
import log from "../../utils/logger";
import User from "../../models/user.model";
import { hashPassword } from "../../utils/auth.utils";
const router = Router();

/* ========================================================================= */
// this process involves two phases
// first, the user sends username and email to the server
// then the server checks if the username is valid or not
// then the server sends a unique OTP to the user via email
// by this time, the user's email, username and OTP is stored in the server's runtime
// then the user sends the OTP with other user data to the server
// then server validates the OTP and other data sent along wit it
// If all checks pass, server creates a new password for the user in the database
// then it sends a successful response to the user, if all checks pass
/* ========================================================================= */

const forgotUsers: DemoUser[] = [];

// first phase of forgot password
router.post("/forgot-password", async (req: Request, res: Response) => {
  log.info(`${req.method.toUpperCase()} ${req.url}`);

  // get the user data from the request and validates, if present or not
  const { username, email } = req.body;

  if (!username || !email) {
    // username or email not present in the request
    return res.status(400).json({
      message: "Invalid data",
    });
  }
  try {
    // find a user with the email in the database
    const user = await User.findOne({ email: email });

    if (!user) {
      // user with a same email is not found in the database, return error
      return res.status(400).json({
        message: "No user found with the given credentials",
      });
    } else if (user.username !== username) {
      // username does not match
      return res.status(401).json({
        message: "Credentials do not match",
      });
    }

    // user is found, send the otp on email
    const otp = Math.floor(100000 + Math.random() * 900000);

    // push a user in the forgotUser array
    forgotUsers.push({ username, email, otp });

    // create data to be sent to mailer
    const data: MailerData = {
      message: "This contains your OTP for resetting your password",
      otp: otp,
      subject: "OTP for resetting password",
    };

    // send mail to the user
    // await mail(email, data);

    // log the otp, only for testing/development purpose
    log.info(otp);

    // send successful response to the user
    return res.status(200).json({
      message: "OTP sent to your email",
    });
  } catch (err) {
    log.error(err);

    // if any of the above steps fails, send error response to the user
    return res.status(500).json({
      message: "Problem in getting the user",
    });
  }
});

// second phase of forgot password
router.post(
  "/reset-password",
  async (req: Request<unknown, unknown, ForgotUser>, res: Response) => {
    log.info(`${req.method.toUpperCase()} ${req.url}`);

    // get the user data from the request and validates, if present or not
    const { username, password, confirmPassword, otp } = req.body;

    if (!username || !password || !confirmPassword || !otp) {
      // check if the required data is present in the request
      return res.status(400).json({
        message: "Invalid data",
      });
    }

    // all data is present in the request
    if (password !== confirmPassword) {
      // password and confirm password dont match
      return res.status(401).json({
        message: "Passwords do not match",
      });
    }

    // password and confirm password match
    try {
      // find user in the database
      const user = await User.findOne({ username: username });
      if (!user) {
        // no user found in the database
        return res.status(400).json({
          message: "No user found with the given credentials",
        });
      }

      // user present in the database
      // check if the user has done the first phase of forgot password
      let userFound: DemoUser = null;
      for (let i = 0; i < forgotUsers.length; i++) {
        if (forgotUsers[i].username === username) {
          // if user is found, store it in userFound variable
          userFound = forgotUsers[i];

          // is user is found, remove the user from the forgotUsers array
          forgotUsers.splice(i, 1);
          break;
        }
      }

      // check if user found in the forgotUsers array
      if (userFound === null) {
        // user not found in the forgotUsers array, return error
        return res.status(400).json({
          message: "No user found",
        });
      } else if (userFound.otp !== otp) {
        // otp does not match, return error
        return res.status(401).json({
          message: "OTP incorrect",
        });
      }

      // all set, change the password
      const { salt, hash } = hashPassword(password);
      user.salt = salt;
      user.hash = hash;
      await user.save();

      // send the successful response to the user
      return res.status(200).json({
        message: "Password changed successfully",
      });
    } catch (err) {
      log.error(err);
      // if any of the above steps fails, send error response to the user
      return res.status(500).json({
        message: "Problem in resetting password",
      });
    }
  }
);

export default router;
