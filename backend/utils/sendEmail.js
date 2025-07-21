const nodemailer = require("nodemailer");
const User = require("../models/authModel");
require("dotenv").config(); 

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (userId, subject, resetToken) => {
  try {
    const user = await User.findById(userId);
    if (!user || !user.email) {
      throw new Error("User not found or email missing");
    }

    const resetLink = `${process.env.FRONTEND_URL}/resetPassword?token=${resetToken}&id=${userId}`;

    const mailOptions = {
      from: `"Task Management" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject,
      text: `Click the following link to reset your password: ${resetLink}`,
      html: `
        <div style="text-align: center; font-family: Arial, sans-serif;">
          <h2>Password Reset Request</h2>
          <p>If you requested to reset your password, click the button below:</p>
          <a href="${resetLink}" style="
            display: inline-block;
            padding: 12px 20px;
            margin: 10px;
            font-size: 16px;
            color: white;
            background-color: #115293;
            text-decoration: none;
            border-radius: 5px;
          ">Reset Password</a>
          <p>If you didn't request this, you can ignore this email.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${user.email}, Message ID: ${info.messageId}`);
  } catch (error) {
    console.error("Email sending failed:", error.message);
    throw new Error("Email sending failed");
  }
};

module.exports = {sendEmail};
