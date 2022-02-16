import express from "express";
import {
  addExpenses,
  addIncome,
  deleteExpenses,
  getUserExpenses,
} from "../controllers/expenses.js";
const expensesRouter = express.Router();

expensesRouter.get("/getExpenses/:userId", getUserExpenses); //get expenses and income because they are in the same collection
expensesRouter.put("/addExpenses/:userId", addExpenses); // update only expenses array in the Expenses collection
expensesRouter.delete("/deleteExpenses/:userId/:expensesId", deleteExpenses); // update only expenses array in the Expenses collection
expensesRouter.put("/addIncome/:userId", addIncome); // update only expenses array in the Expenses collection

export default expensesRouter;
