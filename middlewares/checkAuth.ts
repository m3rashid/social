import { verifyJWT } from "../utils/jwt.utils";
import { Response, NextFunction } from "express";
import { SecureRequest } from "../types/secureUser.types";

// this middleware checks auth token and if it is valid, it will set the user to the request
// otherwise, it will return 401

const checkAuth = (req: SecureRequest, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  const { valid, expired, payload } = verifyJWT(token);
  if (!valid || expired) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
  // setting user to the request object
  req.user = payload.sub;
  next();
};

export default checkAuth;
