import express from "express";
import {
  addExpenses,
  addIncome,
  deleteExpenses,
  deleteExpensesCategory,
  deleteIncome,
  deleteIncomeCategory,
  getUserExpenses,
} from "../controllers/expenses.js";
const expensesRouter = express.Router();

//get expenses and income because they are in the same collection
expensesRouter.get("/getExpenses/:userId", getUserExpenses);
// add an expense transaction in the desired category and subcategory
expensesRouter.put("/addExpenses/:userId", addExpenses);
// delete an expense transaction from the desired category and subcategory
expensesRouter.delete("/deleteExpenses/:userId", deleteExpenses);
// delete the whole category
expensesRouter.delete(
  "/deleteExpensesCategory/:userId/:categoryId",
  deleteExpensesCategory
);
// add an income transaction in the desired category
expensesRouter.put("/addIncome/:userId", addIncome);
// delete the whole category
expensesRouter.delete(
  "/deleteIncomeCategory/:userId/:categoryId",
  deleteIncomeCategory
);
// delete an income transaction from the desired category
expensesRouter.delete("/deleteIncome/:userId", deleteIncome);

export default expensesRouter;
