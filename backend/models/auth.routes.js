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
    // Basic validation
    if (!fullname || !email || !password) {
      return res.status(422).json({
        status: false,
        message: "Please input all details",
      });
    }

    // Check if the email already exists
    const alreadyRegistered = await UserDB.findOne({ email });
    if (alreadyRegistered) {
      return res.status(400).json({
        status: false,
        message: "User already exists",
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create the new user
    const newUser = new UserDB({
      fullname,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    // Send success response with user info (excluding password)
    return res.status(201).json({
      status: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);

    // Return a detailed error message if something goes wrong
    return res.status(500).json({
      status: false,
      message: "Server error, please try again later",
      error: error.message, // Optional: only in development
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ status: false, message: "Please input all details" });
    }

    // Check if user exists
    const user = await UserDB.findOne({ email });
    if (!user) {
      return res.status(401).json({ status: false, message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ status: false, message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email, fullname: user.fullname },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      secure: true, // true if using HTTPS
      sameSite: "None", // Required for cross-site cookies
    });

    // Send response
    return res.status(200).json({
      status: true,
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        fullname: user.fullname,
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ status: false, message: "Server error" });
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
