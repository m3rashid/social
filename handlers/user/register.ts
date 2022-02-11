import { Request, Response, Router } from "express";
import { MailerData } from "../../types/mailerData.types";
import { DemoUser } from "../../types/demoUser.types";
import mail from "../../utils/mailer";
import log from "../../utils/logger";
import { issueJWT } from "../../utils/jwt.utils";
import { hashPassword } from "../../utils/auth.utils";
import { UserInput, UserDocument } from "../../types/userModel.types";
import User from "../../models/user.model";
const router = Router();

/* ========================================================================= */
// register involves two phases
// first, the user sends username and email to the server
// then the server checks if the username is valid or not
// then the server sends a unique OTP to the user via email
// by this time, the user's email, username and OTP is stored in the server's runtime
// then the user sends the OTP with other user data to the server
// then server validates the OTP and other data sent along wit it
// If all checks pass, server creates a new user in the database
// then it sends the user a JWT token for further requests
/* ========================================================================= */

const demoUsers: DemoUser[] = [];

// first phase of registration
router.post(
  "/register-one",
  async (req: Request<unknown, unknown, DemoUser>, res: Response) => {
    log.info(`${req.method.toUpperCase()} ${req.url}`);

    // get the user data from the request and validates, if present or not
    const { username, email } = req.body;
    if (!username || !email) {
      // username or email not present in the request
      return res.status(400).json({
        message: "Invalid data",
      });
    }

    // username and email both are present
    // search for a user with the same email in the database
    const user = await User.findOne({ email: email });
    if (user) {
      // user with a same email is found in the database, return error
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // no user with the same email is found, this is a unique email
    let otp: number;
    let userIndex: number = null;

    // check if the user already tried before
    // iterate over the demouser array and check if the user is already present
    for (let i = 0; i < demoUsers.length; i++) {
      if (demoUsers[i].username === username) {
        userIndex = i;
        break;
      }
    }

    if (userIndex === null) {
      // new user is trying to register, generate a unique OTP
      otp = Math.floor(100000 + Math.random() * 900000);

      // store the user data in the server's runtime
      demoUsers.push({ username, email, otp });
    } else {
      // already existing user, use the same OTP stored in the demoUsers array
      otp = demoUsers[userIndex].otp;
    }

    // create a mailer data to be sent to the user
    const data: MailerData = {
      message: "This contains your OTP for signing up with Social",
      otp: otp,
      subject: "OTP for signup to Social",
    };

    // send mail to the user
    // await mail(email, data);

    // log otp (only for testing and development purposes)
    log.info(`OTP: ${otp}`);

    // return success response to the user
    return res.status(200).json({
      message: "OTP sent to your email",
    });
  }
);

// second phase of registration
router.post(
  "/register-two",
  async (req: Request<unknown, unknown, UserInput>, res: Response) => {
    log.info(`${req.method.toUpperCase()} ${req.url}`);

    // get the user data from the request and validates, if present or not
    const { name, email, username, password, confirmPassword, otp } = req.body;

    if (!username || !email || !password || !confirmPassword || !otp) {
      // any of the required data is absent, return error
      return res.status(400).json({
        message: "Invalid data",
      });
    }

    // get the user data from the demoUsers array
    let userFound: DemoUser = null;
    for (let i = 0; i < demoUsers.length; i++) {
      if (demoUsers[i].username === username) {
        // if user is found, store it in the userFound variable
        userFound = demoUsers[i];

        // if user is found, remove the user from the demoUsers array
        demoUsers.splice(i, 1);
        break;
      }
    }

    if (userFound === null) {
      // user not found in the demoUsers array, return error
      return res.status(400).json({
        message: "User not found, complete the first step first",
      });
    }

    // user is found, check for otp
    if (userFound.otp !== otp) {
      // otp do not match, return error
      return res.status(401).json({
        message: "OTP does not match",
      });
    }

    if (password !== confirmPassword) {
      // password and confirm password do not match, return error
      return res.status(401).json({
        message: "Passwords do not match",
      });
    }

    // generate salt and hash from the password
    const { salt, hash } = hashPassword(password);

    // create a new user
    const newUser: UserDocument = new User({
      name,
      email,
      username,
      salt,
      hash,
    });

    try {
      // save the newly created user in the database
      const user = await newUser.save();
      // create a JWT token for the user
      const { token, expires } = issueJWT(user);

      // return success response to the user with the JWT token
      return res.status(200).json({
        token,
        expires,
        message: "User registered successfully",
        user,
      });
    } catch (err) {
      log.error(err);
      // if any error is found in any of the above processes, return error response to the user
      return res.status(500).json({
        message: "Server error while registering the user",
      });
    }
  }
);

export default router;
