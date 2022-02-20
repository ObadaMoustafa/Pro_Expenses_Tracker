import Debts from "../models/debts.js";
import { producePaidDebtsTransactions } from "../utils/producePaidDebtsTransactions.js";

export const getUserDebts = async (req, res) => {
  try {
    const { userId } = req.params;
    const userDebts = await Debts.find({ userId });

    const allTransactions = producePaidDebtsTransactions(userDebts);

    res.status(200).json({
      success: true,
      result: userDebts,
      allTransactions,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};
export const createNewDebt = async (req, res) => {
  try {
    const { userId } = req.params;
    await Debts.create({ userId, ...req.body });
    const userDebts = await Debts.find({ userId });

    const allTransactions = producePaidDebtsTransactions(userDebts);
    res.status(200).json({
      success: true,
      result: userDebts,
      allTransactions,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

export const payDebts = async (req, res) => {
  try {
    const { userId, debtId } = req.params;
    const theDebt = await Debts.findById(debtId);
    await theDebt.payHistory.unshift(req.body);
    await theDebt.save();

    const userDebts = await Debts.find({ userId });
    const allTransactions = producePaidDebtsTransactions(userDebts);

    res.status(200).json({
      success: true,
      result: userDebts,
      allTransactions,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

export const deletePaidDebtTransaction = async (req, res) => {
  try {
    const { userId } = req.params;
    const { debtTitle, transactionId } = req.body;

    const debtToModify = await Debts.findOne({ title: debtTitle, userId });
    const payHistory = debtToModify.payHistory;
    const newPayHistory = payHistory.filter(
      (transaction) => transaction._id.toString() !== transactionId
    );
    debtToModify.payHistory = newPayHistory;
    await debtToModify.save();

    const userDebts = await Debts.find({ userId });
    const allTransactions = producePaidDebtsTransactions(userDebts);

    res.status(200).json({
      success: true,
      result: userDebts,
      allTransactions,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};
