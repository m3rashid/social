import crypto from "crypto";

const hashPassword = (password: string) => {
  // Generate a salt, hash from the node crypto library
  const salt = crypto.randomBytes(32).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  // return the salt and hash
  return { salt, hash };
};

const comparePassword = (password: string, hash: string, salt: string) => {
  // Verify the password using the hash and salt
  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  // return the boolean value, if the hash and hashVerify are equal, return true
  return hash === hashVerify;
};

export { hashPassword, comparePassword };
