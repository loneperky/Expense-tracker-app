import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ExpenseDB, UserDB } from "../config/product.db.js";


const router = express.Router();

router.post("/add", async (req, res) => {
  const { amount, description, time,title} = req.body;
  if (!amount || !description || !time || !title) {
    return res.json({status:false, message: "Please input all details" });
  }
  const newExpense = new ExpenseDB({
    amount,
    description,
    time,
    title
  });
  await newExpense.save();
  return res.json(newExpense);
});

router.get("/all", async (req, res) => {
  const AllExpense = await ExpenseDB.find();
  if (!AllExpense) {
    return res.json({message:"Could not detch user expense"});
  }
  return res.json(AllExpense)
});

router.post("/register", async (req, res) => {
  const { fullname, email, password } = req.body;
  if (!fullname || !email || !password) {
    return res.json({status:false, message: "Please input all details" });
  }
  const newUser = new UserDB({
    fullname,
    email,
    password
  });
  await newUser.save();
  return res.json(newUser,{message:"User registered successfully",status:true});
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({status:false, message: "Please input all details" });
  }
  const user = await UserDB.findOne({ email});
  if (!user) {
    return res.json({status:false, message: "Invalid credentials" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.json({status:false, message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("token", token, { httpOnly: true, secure: true,maxAge: 3600000,});
  // Set the cookie with the token and other options  
  return res.json({status:true, message: "Login successful", token });
  return res.json(user);
});

export default router;
