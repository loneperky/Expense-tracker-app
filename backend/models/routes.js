import express from "express";
import ExpenseDB from "../config/product.db.js";

const router = express.Router();

router.post("/add", (req, res) => {
  const { title, description, time } = req.body;
  if(!title || !description || !time){
    return res.json({message: "Please input all details"})
  }
  const newExpense = new ExpenseDB({
    title,
    description,
    time
  })
  return res.json(newExpense)
});

export default router