import express from "express";
import {
  createNewDebt,
  deleteDebt,
  deletePaidDebtTransaction,
  editDebtDetails,
  getUserDebts,
  payDebts,
} from "../controllers/debts.js";
const debtsRouter = express.Router();

debtsRouter.get("/getUserDebts/:userId", getUserDebts);
debtsRouter.post("/createNewDebt/:userId", createNewDebt);
debtsRouter.put("/payDebt/:userId/:debtId", payDebts);
debtsRouter.delete("/deleteDebt/:userId/:debtId", deleteDebt);
debtsRouter.delete(
  "/deletePaidDebtsTransaction/:userId/",
  deletePaidDebtTransaction
);
debtsRouter.put("/editDebtDetails/:userId/:debtId/", editDebtDetails);

export default debtsRouter;
