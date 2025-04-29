import express from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserDB } from "../config/product.db.js";
import authToken from "../config/middleware.js";

const router = express.Router();


router.post("/register", async (req, res) => {
  const { fullname, email, password } = req.body
  try {
    if (!fullname || !email || !password) {
      return res.json({ status: false, message: "Please input all details" });
    }
    const alreadyRegistered = await UserDB.findOne({ email });
    if (alreadyRegistered)  return res.status(301).json({ message: "user already exist", status: false });

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
  const { email, password } = req.body
  if (!email || !password) {
    return res.json({ status: false, message: "Please input all details" });
  }
  const user = await UserDB.findOne({ email });
  if (!user) {
    return res.json({ status: false, message: "Invalid credentials" });
  }
  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    return res.json({ status: false, message: "Invalid credentials" });
  }else{
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
  }
  router.get("/dashboard",authToken, async (req,res)=>{
    res.json(authToken)
  })
  
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 3600000,
    secure: false,
  });
  // Set the cookie with the token and other options
  return res.json(user, { status: true, message: "Login successful", token });
});


router.post("/logout", async (req, res) => {
  res.clearCookie("token"); // Clear the cookie
  return res.json({ status: true, message: "Logout successful" });
});



export default router;
