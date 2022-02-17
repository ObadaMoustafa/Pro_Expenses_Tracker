import Debts from "../models/debts.js";
import Expenses from "../models/Expenses.js";

async function produceExpensesObject(userId) {
  const userExpenses = await Expenses.findOne({ userId });
  const userDebts = await Debts.find({ userId });
  const { expenses, income } = userExpenses;

  // if the user doesn't has expenses
  let totalExpenses = [];
  let totalIncome = [];
  let debts = [];

  // set totalExpenses
  if (expenses.length > 0)
    totalExpenses = expenses.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

  if (income.length > 0)
    totalIncome = income.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

  if (userDebts.length > 0) {
    const payHistories = userDebts.map((debt) => debt.payHistory);
    payHistories.forEach((payHistory) => debts.push(...payHistory));
    debts.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  }

  return { expenses: totalExpenses, income: totalIncome, debts };
}

export default produceExpensesObject;
