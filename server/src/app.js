import express from "express";
import cors from "cors";
import testRouter from "./routes/test.js";
import usersRouter from "./routes/users.js";
import expensesRouter from "./routes/expenses.js";
import debtsRouter from "./routes/debts.js";

export const app = express();

// use json middleware
app.use(express.json());

//let everyone use our api
app.use(cors());

app.use("/api/test", testRouter);
app.use("/api/users", usersRouter);
app.use("/api/expenses", expensesRouter);
app.use("/api/debts", debtsRouter);
