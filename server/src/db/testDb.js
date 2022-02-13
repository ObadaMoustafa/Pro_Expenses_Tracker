import dotenv from "dotenv";
dotenv.config();
import Expenses from "../models/Expenses.js";
import Users from "../models/Users.js";
import { connectDB, disconnectDb } from "./connectDB.js";

async function logSomething() {
  try {
    await connectDB();
    const expense = await Expenses.findById(
      "6208e591ec4e4f37c25cd7bb"
    ).populate("userId");
    console.log(expense);
  } catch (error) {
    console.log(error);
  } finally {
    disconnectDb();
  }
}
logSomething();
