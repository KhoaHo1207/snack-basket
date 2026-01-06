const User = require("../models/user.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");
const generateOTP = require("../utils/generateOTP");
const sendEmail = require("../utils/sendEmail");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    const user = await user.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your account",
      });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.log("Login failed", error);
    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

const register = async (req, res) => {
  try {
    const { email, fullName, phoneNumber, password, address } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    if (!fullName) {
      return res.status(400).json({
        success: false,
        message: "Full name is required",
      });
    }
    if (!phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }
    if (!address) {
      return res.status(400).json({
        success: false,
        message: "Address is required",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Email has been used",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { otp, hashedOTP } = await generateOTP();

    const newUser = await User.create({
      email,
      fullName,
      phoneNumber,
      password: hashedPassword,
      address,
      otp: hashedOTP,
      otpExpire: new Date(Date.now() + 10 * 60 * 1000),
    });

    await sendEmail({
      to: email,
      subject: "Verify your account",
      html: `
        <h2>Verify your account</h2>
        <p>Your OTP code:</p>
        <h1>${otp}</h1>
        <p>Expires in 10 minutes</p>
      `,
    });

    return res.status(201).json({
      success: true,
      message: "Register successful, please check your email for verification",
    });
  } catch (error) {
    console.log("Register failed", error);
    return res.status(500).json({
      success: false,
      message: "Register failed",
    });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    if (user.otpExpire < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }
    const isCorrectOTP = await bcrypt.compare(otp, user.otp);
    if (!isCorrectOTP) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpire = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.log("Verify OTP failed", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "User already verified",
      });
    }
    const { otp, hashedOTP } = await generateOTP();
    user.otp = hashedOTP;
    user.otpExpire = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();
    await sendEmail({
      to: email,
      subject: "Verify your account",
      html: `
        <h2>Verify your account</h2>
        <p>Your OTP code:</p>
        <h1>${otp}</h1>
        <p>Expires in 10 minutes</p>
      `,
    });
    return res.status(200).json({
      success: true,
      message: "OTP resent successfully",
    });
  } catch (error) {
    console.log("Resend OTP failed", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await User.findOne({ refreshToken });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    user.refreshToken = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Refresh token is required",
      });
    }
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(400).json({
        success: false,
        message: "Invalid refresh token",
      });
    }
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const accessToken = generateAccessToken(user._id);
    return res.status(200).json({
      success: true,
      message: "Refresh token successful",
      data: {
        accessToken,
      },
    });
  } catch (error) {
    console.log("Refresh token failed", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const { otp, hashedOTP } = await generateOTP();
    user.otp = hashedOTP;
    user.otpExpire = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();
    await sendEmail({
      to: email,
      subject: "Forgot password",
      html: `
        <h2>Forgot password</h2>
        <p>Your OTP code:</p>
        <h1>${otp}</h1>
        <p>Expires in 10 minutes</p>
      `,
    });
    return res.status(200).json({
      success: true,
      message: "OTP sent to email",
    });
  } catch (error) {
    console.log("Forgot password failed", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }
    if (!otp) {
      return res.status(400).json({
        success: false,
        message: "OTP is required",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    if (user.otpExpire < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }
    const isCorrectOTP = await bcrypt.compare(otp, user.otp);
    if (!isCorrectOTP) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }
    user.password = await bcrypt.hash(password, 10);
    user.otp = undefined;
    user.otpExpire = undefined;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log("Reset password failed", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User found",
      data: user,
    });
  } catch (error) {
    console.log("Get current user failed", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  login,
  register,
  verifyOTP,
  resendOTP,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
  getCurrentUser,
};

// register
// verify
// resend-otp
// login
// refresh-token
// logout
// forgot-password
// reset-password
// me
