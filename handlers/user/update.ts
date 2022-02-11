import log from "../../utils/logger";
import checkAuth from "../../middlewares/checkAuth";
import { SecureRequest } from "../../types/secureUser.types";
import { Response, Router } from "express";
import User from "../../models/user.model";
import { UserDocument } from "../../types/userModel.types";
const router = Router();

router.post(
  "/update-name",
  checkAuth,
  async (req: SecureRequest, res: Response) => {
    log.info(`${req.method.toUpperCase()} ${req.url}`);
    const user = req.user as UserDocument;

    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        message: "Name is required",
      });
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(user._id, { name });
      // user.name = name;
      // await user.save();

      return res.status(200).json({
        message: "Name updated successfully",
        updatedUser,
      });
    } catch (err) {
      log.error(err);
      return res.status(500).json({
        message: "Error in sending request",
      });
    }
  }
);

router.post(
  "/update-avatar",
  checkAuth,
  async (req: SecureRequest, res: Response) => {
    log.info(`${req.method.toUpperCase()} ${req.url}`);
    const user = req.user as UserDocument;

    const { avatar } = req.body;
    if (!avatar) {
      return res.status(400).json({
        message: "Avatar is required",
      });
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(user._id, { avatar });
      return res.status(200).json({
        message: "Avatar updated successfully",
        updatedUser,
      });
    } catch (err) {
      log.error(err);
      return res.status(500).json({
        message: "Error in sending request",
      });
    }
  }
);

router.post(
  "/update-bio",
  checkAuth,
  async (req: SecureRequest, res: Response) => {
    log.info(`${req.method.toUpperCase()} ${req.url}`);
    const user = req.user as UserDocument;

    const { bio } = req.body;
    if (!bio) {
      return res.status(400).json({
        message: "Name is required",
      });
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(user.bio, { bio });
      return res.status(200).json({
        message: "Avatar updated successfully",
        updatedUser,
      });
    } catch (err) {
      log.error(err);
      return res.status(500).json({
        message: "Error in sending request",
      });
    }
  }
);

router.post(
  "/update-dob",
  checkAuth,
  async (req: SecureRequest, res: Response) => {
    log.info(`${req.method.toUpperCase()} ${req.url}`);
    const user = req.user as UserDocument;

    const { dob } = req.body;
    if (!dob) {
      return res.status(400).json({
        message: "Date is required",
      });
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(user.dob, { dob });
      return res.status(200).json({
        message: "Date updated successfully",
        updatedUser,
      });
    } catch (err) {
      log.error(err);
      return res.status(500).json({
        message: "Error in sending request",
      });
    }
  }
);

router.post(
  "/update-website",
  checkAuth,
  async (req: SecureRequest, res: Response) => {
    log.info(`${req.method.toUpperCase()} ${req.url}`);
    const user = req.user as UserDocument;

    const { website } = req.body;
    if (!website) {
      return res.status(400).json({
        message: "website is required",
      });
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(user.websiteUrl, {
        website,
      });
      return res.status(200).json({
        message: "website updated successfully",
        updatedUser,
      });
    } catch (err) {
      log.error(err);
      return res.status(500).json({
        message: "Error in sending request",
      });
    }
  }
);

export default router;
