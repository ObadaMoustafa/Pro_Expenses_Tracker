import Debts from "../models/debts.js";
import Expenses from "../models/Expenses.js";

export const getUserExpenses = async (req, res) => {
  try {
    const { userId } = req.params;
    const userExpenses = await Expenses.findOne({ userId });
    const userDebts = await Debts.find({ userId });

    // if the user has expenses
    if (userExpenses) {
      let debts = null;
      if (userDebts.length > 0) {
        debts = [];
        const payHistories = userDebts.map((debt) => debt.payHistory);
        payHistories.forEach((payHistory) => debts.push(...payHistory));
      }
      const { expenses, income } = userExpenses;
      const allExpenses = { expenses, income, debts };
      res.status(200).json({
        success: true,
        result: allExpenses,
      });
    } else if (userDebts.length > 0) {
      const debts = [];
      if (userDebts) {
        const payHistories = userDebts.map((debt) => debt.payHistory);
        payHistories.forEach((payHistory) => debts.push(...payHistory));
      }
      const allExpenses = { expenses: null, income: null, debts };
      res.status(200).json({
        success: true,
        result: allExpenses,
      });
    } else {
      const allExpenses = { expenses: null, income: null, debts: null };
      res.status(200).json({
        success: true,
        result: allExpenses,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};
