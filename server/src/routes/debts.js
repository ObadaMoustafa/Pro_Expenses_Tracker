import express from "express";
import { createNewDebt } from "../controllers/debts.js";
const debtsRouter = express.Router();

debtsRouter.post("/createNewDebt/:userId", createNewDebt);
debtsRouter.put("/payDebt/:debtId", createNewDebt);

export default debtsRouter;
