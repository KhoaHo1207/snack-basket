const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `Snack Basket <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.log("Send email failed", error);
    throw error;
  }
};

module.exports = sendEmail;
