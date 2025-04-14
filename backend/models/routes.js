import express from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { ExpenseDB, UserDB } from "../config/product.db.js";
import authToken from "../config/middleware.js";

const router = express.Router();

router.post("/add", authToken, async (req, res) => {
  const { amount, description, time, title } = req.body;
  try {

    if (!amount || !description || !time || !title) {
      return res.json({ status: false, message: "Please input all details" });
    }
    const userId = req.user.id

    const newExpense = new ExpenseDB({
      user:userId,
      amount,
      description,
      time,
      title,
    });
    await newExpense.save();
    return res.json(newExpense);
  } catch (error) {
    console.log(error)
  }
  
});

router.get("/all", authToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const AllExpense = await ExpenseDB.find({ user: userId }).sort({time: -1});
    if (!AllExpense) {
      return res.json({ message: "Could not check user expense" });
    }
    return res.json(AllExpense);
  } catch (error) {
    console.log(error)
  }
});

router.post("/register", async (req, res) => {
  const { fullname, email, password } = req.body;
  if (!fullname || !email || !password) {
    return res.json({ status: false, message: "Please input all details" });
  }
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
});





router.post("/login", async (req, res) => {
  const { email, password } = req.body;
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
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
  // Set the cookie with the token and other options
  return res.json(user, { status: true, message: "Login successful", token });
});

router.post("/logout", authToken, async (req, res) => {
  res.clearCookie("token"); // Clear the cookie
  return res.json({ status: true, message: "Logout successful" });
}
);


export default router;
