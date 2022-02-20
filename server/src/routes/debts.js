import express from "express";
import {
  createNewDebt,
  deletePaidDebtTransaction,
  getUserDebts,
  payDebts,
} from "../controllers/debts.js";
const debtsRouter = express.Router();

debtsRouter.get("/getUserDebts/:userId", getUserDebts);
debtsRouter.post("/createNewDebt/:userId", createNewDebt);
debtsRouter.put("/payDebt/:userId/:debtId", payDebts);
debtsRouter.delete(
  "/deletePaidDebtsTransaction/:userId/",
  deletePaidDebtTransaction
);

export default debtsRouter;
