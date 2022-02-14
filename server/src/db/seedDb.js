import dotenv from "dotenv";
dotenv.config();
import { connectDB, disconnectDb, dropDb } from "./connectDB.js";
import { seedDebts } from "./seedDebts.js";
import { seedExpenses } from "./seedExpenses.js";

async function seedDb() {
  try {
    await connectDB();
    await dropDb().dropCollection("expenses");
    await dropDb().dropCollection("debts");
    await seedExpenses();
    await seedDebts();
    console.log("done");
  } catch (error) {
    console.log(error);
  } finally {
    disconnectDb();
  }
}

seedDb();
