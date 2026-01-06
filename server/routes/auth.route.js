const express = require("express");
const router = express.Router();
const {
  login,
  register,
  verifyOTP,
  resendOTP,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
  getCurrentUser,
} = require("../controllers/user.controller");
const { protectRoute, checkRole } = require("../middleware/auth.middleware");

router.post("/login", login);
router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);

router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get(
  "/current-user",
  protectRoute,
  checkRole(["admin", "user"]),
  getCurrentUser
);

module.exports = router;
