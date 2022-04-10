import dotenv from "dotenv";
dotenv.config();
import { connectDB, disconnectDb } from "./connectDB.js";
import { seedExpenses } from "./seedExpenses.js";
import { seedIncome } from "./seedIncome.js";

async function seedDb() {
  try {
    // you can change this to target a specific expenses collection in your database
    const expensesCollectionId = "625163a57083ba40d32f10c5"; // my collection id "625163a57083ba40d32f10c5";
    await connectDB();
    await seedExpenses(expensesCollectionId);
    await seedIncome(expensesCollectionId);
    console.log("done");
  } catch (error) {
    console.log(error);
  } finally {
    disconnectDb();
  }
}

seedDb();
