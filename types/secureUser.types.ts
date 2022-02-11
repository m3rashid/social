import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface SecureRequest extends Request {
  user: string | JwtPayload;
}
