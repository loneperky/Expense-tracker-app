import { ExpenseDB, UserDB } from "../config/product.db.js";
import authToken from "../config/middleware.js";
import dotenv from "dotenv";
import express from "express";
dotenv.config();

const router = express.Router();

router.post("/add", authToken, async (req, res) => {
  const { amount, description, time, title } = req.body;
  try {
    if (!amount || !description || !time || !title) {
      return res.json({ status: false, message: "Please input all details" });
    }
    const localTime = new Date(time).toLocaleTimeString();
    const newExpense = new ExpenseDB({
      userId: req.user.id,
      amount,
      description,
      time:localTime,
      title,
    });
    await newExpense.save();
    await UserDB.findByIdAndUpdate(
      req.user.id,
      {
        $push: {
          expenses: newExpense._id,
        },
      },
      { new: true, runValidators: true }
    );
    return res.status(201).json(newExpense);
  } catch (error) {
    console.log(error);
  }
});

router.get("/all", authToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const AllExpense = await ExpenseDB.find({ userId }).sort({
      time: -1,
    });
    return res.json({ expenses: AllExpense });
  } catch (error) {
    console.log(error);
  }
});

export { router as transx };
