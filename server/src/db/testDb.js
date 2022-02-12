import dotenv from "dotenv";
dotenv.config();
import Expenses from "../models/Expenses.js";
import { connectDB, disconnectDb } from "./connectDB.js";

async function logSomething() {
  try {
    await connectDB();
    const expense = await Expenses.findById(
      "62080d5fd18daaa4205caef6"
    ).populate("userId");
    console.log(expense);
  } catch (error) {
    console.log(error);
  } finally {
    disconnectDb();
  }
}
logSomething();
