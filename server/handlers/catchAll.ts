import { Request, Response, Router } from "express";
const router = Router();
import log from "../utils/logger";

// handling all routes other than defined explicitly
router.all("/*", (req: Request, res: Response) => {
  log.info(`${req.method.toUpperCase()} ${req.url}`);

  // basic response just to show that the server is up and avoid process breaking
  res.status(200).json({
    message: "Welcome to the Social Server",
  });
});

export default router;
