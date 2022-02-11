import JWT from "jsonwebtoken";
import { join } from "path";
import { readFileSync } from "fs";
import { UserDocument } from "../types/userModel.types";
import log from "./logger";

const privateKey = readFileSync(join(__dirname, "./keys/private.pem"), "utf8");
const publicKey = readFileSync(join(__dirname, "./keys/public.pem"), "utf8");

const issueJWT = (user: UserDocument) => {
  // making configurations for the JWT
  const expiresIn = "1d";
  // payload itself contains the user
  const payload = { sub: user, iat: Date.now() };

  // generate the signed token from the payload and the private key using the RSA 256 assymetric algorithm
  const signedToken = JWT.sign(payload, privateKey, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  // returning the signed token with expiration time
  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
};

const verifyJWT = (token: string) => {
  try {
    // take out the token from the <Bearer token> format
    const extractedToken = token.split(" ")[1];

    // decode the token using the public key using the same RSA 256 assymetric algorithm
    const decoded = JWT.verify(extractedToken, publicKey, {
      algorithms: ["RS256"],
    });

    // return true and valid if the token is valid
    return {
      valid: true,
      expired: false,
      payload: decoded,
    };
  } catch (err) {
    log.error(err);
    // return false and invalid if the token is invalid
    return {
      valid: false,
      expired: err.message === "jwt expired",
      payload: null,
    };
  }
};

export { issueJWT, verifyJWT };
