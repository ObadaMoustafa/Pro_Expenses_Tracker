import express from "express";
import { addExpenses, getUserExpenses } from "../controllers/expenses.js";
const expensesRouter = express.Router();

expensesRouter.get("/getExpenses/:userId", getUserExpenses); //get expenses and income because they are in the same collection
expensesRouter.put("/addExpenses/:userId", addExpenses); // update only expenses array in the Expenses collection

export default expensesRouter;
