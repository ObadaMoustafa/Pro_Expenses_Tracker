import Debts from "../models/debts.js";
import Users from "../models/Users.js";
import { producePaidDebtsTransactions } from "../utils/producePaidDebtsTransactions.js";
import { sumArrayAmounts } from "../utils/sumArrayAmounts.js";

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
    if (debtId === "none") throw new Error("Please select the debt to pay for");
    if (req.body.amount <= 0) throw new Error("Amount should be more than 0");

    const theDebt = await Debts.findById(debtId);

    // see how much user should pay to complete the debt amount
    const paidDebts = sumArrayAmounts(theDebt.payHistory);
    const shouldPayAmount = theDebt.amount - paidDebts;

    // add the new pay amount without saving
    await theDebt.payHistory.unshift(req.body);

    // calculate and see if the user paid more than the amount
    const newPaidDebts = sumArrayAmounts(theDebt.payHistory);
    if (theDebt.amount < newPaidDebts) {
      const userObject = await Users.findById(userId);
      const userCurrency = userObject.currency;
      throw new Error(
        `You should put lower amount .. You have only ${shouldPayAmount} ${userCurrency} to pay all amount of this debt`
      );
    }

    // if user paid all the debt amount we change the value to be paid
    if (theDebt.amount - newPaidDebts === 0) theDebt.hasPaid = true;

    // finally we save
    await theDebt.save();

    // prepare the result
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