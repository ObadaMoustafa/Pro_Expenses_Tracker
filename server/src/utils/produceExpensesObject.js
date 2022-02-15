import Debts from "../models/debts.js";
import Expenses from "../models/Expenses.js";

async function produceExpensesObject(userId) {
  const userExpenses = await Expenses.findOne({ userId });
  const userDebts = await Debts.find({ userId });
  const { expenses, income } = userExpenses;
  // if the user doesn't has expenses
  let totalExpenses = null;
  let totalIncome = null;
  let debts = null;

  // set totalExpenses
  if (expenses.length > 0) totalExpenses = expenses;
  if (income.length > 0) totalIncome = income;
  if (userDebts.length > 0) {
    debts = [];
    const payHistories = userDebts.map((debt) => debt.payHistory);
    payHistories.forEach((payHistory) => debts.push(...payHistory));
  }

  return { expenses: totalExpenses, income: totalIncome, debts };
}

export default produceExpensesObject;
