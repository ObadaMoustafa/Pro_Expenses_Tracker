import express from "express";
import { getUserExpenses } from "../controllers/expenses.js";
const expensesRouter = express.Router();

expensesRouter.get("/getExpenses/:userId", getUserExpenses);

export default expensesRouter;
