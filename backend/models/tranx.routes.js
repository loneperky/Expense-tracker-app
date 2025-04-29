import { ExpenseDB } from "../config/product.db.js";
import authToken from "../config/middleware.js";
import dotenv from 'dotenv'
import express from 'express'
dotenv.config()

const router = express.Router()

router.post("/add", authToken, async (req, res) => {
  const { amount, description, time, title } = req.body;
  try {
    if (!amount || !description || !time || !title) {
      return res.json({ status: false, message: "Please input all details" });
    }
    const userId = req.user.id;

    const newExpense = new ExpenseDB({
      user: userId,
      amount,
      description,
      time,
      title,
    });
    await newExpense.save();
    return res.json(newExpense);
    console.log(newExpense)
  } catch (error) {
    console.log(error);
  }
});

router.get("/all", authToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const AllExpense = await ExpenseDB.find({ user: userId }).sort({
      time: -1,
    });
    if (!AllExpense) {
      return res.json({ message: "Could not check user expense" });
    }
    return res.json(AllExpense);
  } catch (error) {
    console.log(error);
  }
});

export {router as transx } 