import mongoose from 'mongoose'

 const Expense = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  time:{
    type: Date,
    required: true,
  },
  description:{
    type:String,
    required:true
  }
 })

 const ExpenseDB = mongoose.model("ExpenseDB",Expense)
 export default ExpenseDB