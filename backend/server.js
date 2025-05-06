import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./models/auth.routes.js";
import { transx } from "./models/tranx.routes.js";
import connectDB from "./utils/ConnectDB.js";
import authToken from "./config/middleware.js";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5174", "https://oxptracker.vercel.app","http://localhost:5173",],
    credentials: true,
  })
);

connectDB();

app.use(cookieParser());
app.use(express.json());
app.use("/auth", router);
app.use("/api", transx);

// mongoose.connect("mongodb://localhost:27017/Expense-Tracker");

app.listen(7000, () => {
  console.log(`server running on 7000`);
});
