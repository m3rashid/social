import { Request, Response, Router } from "express";
import log from "../../utils/logger";
import User from "../../models/user.model";
import { issueJWT } from "../../utils/jwt.utils";
import { comparePassword } from "../../utils/auth.utils";
const router = Router();

interface LoginRequest {
  username: string;
  password: string;
}

// login users in the system
router.post(
  "/login",
  async (req: Request<unknown, unknown, LoginRequest>, res: Response) => {
    log.info(`${req.method.toUpperCase()} ${req.url}`);

    const { username, password } = req.body;

    try {
      // check if user exists in the database
      const user = await User.findOne({ username: username });
      if (!user) {
        // user does not exist
        return res.status(400).json({
          message: "No user found with the given credentials",
        });
      }
      // user found in the database, now check if password is correct
      const passwordMatched = comparePassword(password, user.hash, user.salt);
      if (!passwordMatched) {
        // wrong password
        return res.status(401).json({
          message: "Incorrect username or password",
        });
      }
      // user exists and the password is correct
      // issue a token for the user
      const { token, expires } = issueJWT(user);

      // return the token and the user
      return res.status(200).json({
        token,
        expires,
        message: "User logged in successfully",
        user,
      });
    } catch (err) {
      log.error(err);

      // in case of any error in anything above, return 500
      return res.status(500).json({
        message: "Server error while login",
      });
    }
  }
);

export default router;
