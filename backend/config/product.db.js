import mongoose from "mongoose";

//gWuwPT34713pB5Y4
//loneperky

const Expense = new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId, ref:"User"
  },
  title:{
    type:String,
    required:true
  },
  amount: {
    type: Number,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // Automatically create createdAt and updatedAt fields
  createdAt: {   
    type: Date,
    default: Date.now,   
  }   
},
{ timestamps: true},
);

const User = new mongoose.Schema({
  fullname:{
    type:String,
    required:true
  },
  email:{
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true,
  },
  // Automatically create createdAt and updatedAt fields
  createdAt: {   
    type: Date,
    default: Date.now,   
  },
  updatedAt: {   
    type: Date,
    default: Date.now,   
  },
  resetToken:String,
  resetTokenExpiry:Date,
});

const UserDB = mongoose.model("User", User);
const ExpenseDB = mongoose.model("ExpenseDB", Expense);

export { ExpenseDB,UserDB };
