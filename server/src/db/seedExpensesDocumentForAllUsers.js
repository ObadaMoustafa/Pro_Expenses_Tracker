import dotenv from "dotenv";
dotenv.config();
import Expenses from "../models/Expenses.js";
import Users from "../models/Users.js";
import { connectDB, disconnectDb } from "./connectDB.js";
import mongoose from "mongoose";

//! I run this function when dropping expenses collection. it's to produce an empty expenses document for every user I have in users collection.
async function seedExpensesDocumentForAllUsers() {
  try {
    await connectDB();
    await mongoose.connection.dropCollection("expenses");
    console.log("dropped expenses collection");

    const allUsers = await Users.find();
    console.log("working ...");

    const userIds = allUsers.map(user => user._id);
    for (let i = 0; i < allUsers.length; i++) {
      await Expenses.create({ userId: userIds[i] });
    }

    console.log("done");
  } catch (error) {
    console.log(error);
  } finally {
    disconnectDb();
  }
}

seedExpensesDocumentForAllUsers();
