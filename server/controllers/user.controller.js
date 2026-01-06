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
module.exports = { login, register, verifyOTP, resendOTP };
