import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import router from '../models/routes.js'
dotenv.config()


const app = express()
const PORT = process.env.PORT || 5000
app.use(cors({
  origin:["http://localhost:5174"],
  credentials:true,
}))

app.use(express.json())
app.use("/api",router)

mongoose.connect("mongodb://localhost:27017/Expense-Tracker") 

app.listen(PORT,()=>{
 console.log(`server running on ${PORT}`)
})