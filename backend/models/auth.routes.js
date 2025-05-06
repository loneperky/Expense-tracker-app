import express from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserDB } from "../config/product.db.js";
import nodemailer from "nodemailer";
import authToken from "../config/middleware.js";
import dotenv from "dotenv";
import crypto from "crypto";
dotenv.config();

const router = express.Router();

router.post("/register", async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    if (!fullname || !email || !password) {
      return res.json({ status: false, message: "Please input all details" });
    }
    const alreadyRegistered = await UserDB.findOne({ email });
    if (alreadyRegistered)
      return res
        .status(301)
        .json({ message: "user already exist", status: false });

    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new UserDB({
      fullname,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    console.log(newUser);
    return res.json(newUser, {
      message: "User registered successfully",
      status: true,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.json({ status: false, message: "Please input all details" });
    }
    const user = await UserDB.findOne({ email });
    if (!user) {
      return res.json({ status: false, message: "Invalid credentials" });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch)
      return res.json({ status: false, message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email, fullname: user.fullname },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    ("❌");
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000,
      secure: false,
    });
    // Set the cookie with the token and other options
    return res.json(user, { status: true, message: "Login successful", token });
  } catch (error) {
    console.log(error);
  }
});

router.get("/profile", authToken, async (req, res) => {
  try {
    res.json(req.user);
    console.log({ user: req.user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/logout", async (req, res) => {
  res.clearCookie("token"); // Clear the cookie
  return res.json({ status: true, message: "Logout successful" });
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const user = await UserDB.findOne({ email });
  if (!user) return res.json({ status: false, message: "user not found" });

  const token = crypto.randomBytes(20).toString("hex");
  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 1000 * 60 * 5; // 1 hour
  await user.save();
  console.log(token, user.resetToken, user.expireToken);
  // Create a transporter object
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  // Configure the mailoptions object
  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: "Password Reset",
    text: "Click the link to reset your password: ", // Add the link to your frontend route for resetting the password
    html: `<p>Click the link to reset your password:</p><a href="http://localhost:5173/reset-password/${token}">Reset Password</a>`,
  };

  // Send the email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await UserDB.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return res.json({ status: false, message: "Invalid or expired token" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = undefined; // Clear the reset token
    user.resetTokenExpiry = undefined; // Clear the expiry time
    await user.save();
    return res.json({ status: true, message: "Password reset successful" });
  } catch (error) {
    return res.json({ status: false, message: "Invalid token", error });
  }
});

export default router;
