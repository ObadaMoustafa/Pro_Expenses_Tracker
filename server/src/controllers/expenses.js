import Expenses from "../models/Expenses.js";
import produceExpensesObject from "../utils/produceExpensesObject.js";
export const getUserExpenses = async (req, res) => {
  try {
    const { userId } = req.params;
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

export const addExpenses = async (req, res) => {
  try {
    const { userId } = req.params;

    const oldExpensesObject = await Expenses.findOne({ userId });
    await oldExpensesObject.expenses.push(req.body);
    await oldExpensesObject.save();
    const _id = await oldExpensesObject.expenses[
      oldExpensesObject.expenses.length - 1
    ]._id;
    const allExpenses = await produceExpensesObject(userId);

    res.status(200).json({
      success: true,
      result: allExpenses,
      _id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};
export const deleteExpenses = async (req, res) => {
  try {
    const { userId, expensesId } = req.params;

    const oldExpensesObject = await Expenses.findOne({ userId });
    const newExpensesObject = oldExpensesObject.expenses.filter(
      (singleExpenses) => singleExpenses._id.toString() !== expensesId
    );
    oldExpensesObject.expenses = newExpensesObject;
    await oldExpensesObject.save();

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

export const addIncome = async (req, res) => {
  try {
    const { userId } = req.params;

    const oldExpensesObject = await Expenses.findOne({ userId });
    await oldExpensesObject.income.push(req.body);
    await oldExpensesObject.save();
    const _id =
      oldExpensesObject.income[oldExpensesObject.income.length - 1]._id;

    const allExpenses = await produceExpensesObject(userId);

    res.status(200).json({
      success: true,
      result: allExpenses,
      _id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

export const deleteIncome = async (req, res) => {
  try {
    const { userId, incomeId } = req.params;

    const oldExpensesObject = await Expenses.findOne({ userId });
    const newExpensesObject = oldExpensesObject.income.filter(
      (singleExpenses) => singleExpenses._id.toString() !== incomeId
    );
    oldExpensesObject.income = newExpensesObject;
    await oldExpensesObject.save();

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
