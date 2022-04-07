import dotenv from "dotenv";
dotenv.config();
import { connectDB, disconnectDb, dropDb } from "./connectDB.js";
import { seedExpenses } from "./seedExpenses.js";
import { seedIncome } from "./seedIncome.js";

async function seedDb() {
  try {
    await connectDB();
    await seedExpenses();
    await seedIncome();
    console.log("done");
  } catch (error) {
    console.log(error);
  } finally {
    disconnectDb();
  }
}

seedDb();
