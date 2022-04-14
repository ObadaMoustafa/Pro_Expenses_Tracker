import Debts from "../models/debts.js";
import Users from "../models/Users.js";
import produceExpensesObject from "../utils/produceExpensesObject.js";
import { sumArrayAmounts } from "../utils/sumArrayAmounts.js";

export const getUserDebts = async (req, res) => {
  try {
    const { userId } = req.params;
    const userDebts = await Debts.find({ userId });

    res.status(200).json({
      success: true,
      result: userDebts,
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
    if (req.body.amount <= 0) throw new Error("Debt amount can't be <= 0");
    await Debts.create({ userId, ...req.body });
    const userDebts = await Debts.find({ userId });

    res.status(200).json({
      success: true,
      result: userDebts,
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

    // sort the pay history array by date
    theDebt.payHistory.sort((a, b) => {
      return b.date.localeCompare(a.date);
    });

    // finally we save
    await theDebt.save();

    // prepare the result
    // we use this function to change in both expensesContext and debtsContext;
    const allExpenses = await produceExpensesObject(userId);

    res.status(200).json({
      success: true,
      result: allExpenses,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

export const deleteDebt = async (req, res) => {
  try {
    const { userId, debtId } = req.params;
    await Debts.findByIdAndDelete(debtId);

    const userDebts = await Debts.find({ userId });

    res.status(200).json({
      success: true,
      result: userDebts,
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
    const { debtId, transactionId } = req.body;
    const debtToModify = await Debts.findById(debtId);

    // filter the payHistory to delete the specific transaction
    const payHistory = debtToModify.payHistory;
    const newPayHistory = payHistory.filter(
      transaction => transaction._id.toString() !== transactionId
    );

    // modify the payHistory and hasPaid keys
    debtToModify.payHistory = newPayHistory;
    debtToModify.hasPaid = false;
    await debtToModify.save();

    const userDebts = await Debts.find({ userId });

    res.status(200).json({
      success: true,
      result: userDebts,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};
export const editDebtDetails = async (req, res) => {
  try {
    const { userId, debtId } = req.params;
    const { amount } = req.body;
    if (amount <= 0) throw new Error("Debt amount can't be <= 0");
    const userObject = await Users.findById(userId);
    const debt = await Debts.findById(debtId);

    // totalPaidHistory
    const totalPaidAmount = sumArrayAmounts(debt.payHistory);

    if (amount < totalPaidAmount)
      throw new Error(
        `You already paid ${totalPaidAmount} ${userObject.currency} for this debt .. you can't modify the amount less than ${totalPaidAmount} ${userObject.currency}`
      );

    //start updating the debt
    if (Number(amount) === totalPaidAmount) {
      debt.hasPaid = true;
    } else {
      debt.hasPaid = false;
    }

    await debt.updateOne(req.body);
    await debt.save();

    const userDebts = await Debts.find({ userId });

    res.status(200).json({
      success: true,
      result: userDebts,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};
