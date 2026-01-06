const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generateAccessToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const generateRefreshToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = { generateAccessToken, generateRefreshToken };
