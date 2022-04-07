import express from "express";
import {
  addExpenses,
  addIncome,
  deleteExpenses,
  deleteExpensesCategory,
  deleteIncome,
  getUserExpenses,
} from "../controllers/expenses.js";
const expensesRouter = express.Router();

expensesRouter.get("/getExpenses/:userId", getUserExpenses); //get expenses and income because they are in the same collection
expensesRouter.put("/addExpenses/:userId", addExpenses); // update only expenses array in the Expenses collection
expensesRouter.delete("/deleteExpenses/:userId", deleteExpenses); // update only expenses array in the Expenses collection
expensesRouter.delete(
  "/deleteExpensesCategory/:userId/:categoryId",
  deleteExpensesCategory
); // update only expenses array in the Expenses collection
expensesRouter.put("/addIncome/:userId", addIncome); // update only expenses array in the Expenses collection
expensesRouter.delete("/deleteIncome/:userId/:incomeId", deleteIncome); // update only expenses array in the Expenses collection

export default expensesRouter;
