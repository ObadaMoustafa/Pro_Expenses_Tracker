import mongoose from "mongoose";
import Expenses from "../models/Expenses.js";

export const seedExpenses = async () => {
  await Expenses.create(dataToSeed);
};

const dataToSeed = [
  {
    userId: mongoose.Types.ObjectId("62080199a9c52293e8d91610"),
    expenses: [
      {
        date: "2022-02-01",
        amount: 500,
      },
    ],
    income: [
      {
        date: "2022-02-12",
        amount: 1500,
      },
    ],
  },
];
