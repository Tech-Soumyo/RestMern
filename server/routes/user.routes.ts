import express from "express";
import {
  checkAuth,
  forgotPassword,
  signin,
  logout,
  signup,
  updateProfile,
  verifyEmail,
  resetpassword,
} from "../controller/user.controller";
import { isAuthenticated } from "../middleware/isAuthenticated.mid";

const router = express.Router();

router.route("/check-auth").get(isAuthenticated, checkAuth);
router.route("/signup").post(signup);
router.route("/login").post(signin);
router.route("/logout").post(logout);
router.route("/verify-email").post(verifyEmail);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(resetpassword);
router.route("/profile/update").put(isAuthenticated, updateProfile);

export default router;
