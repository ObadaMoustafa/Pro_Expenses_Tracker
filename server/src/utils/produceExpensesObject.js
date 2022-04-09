import Debts from "../models/debts.js";
import Expenses from "../models/Expenses.js";

async function produceExpensesObject(userId) {
  const userExpenses = await Expenses.findOne({ userId });
  const userDebts = await Debts.find({ userId });
  const { expenses, income } = userExpenses;

  let paidDebts = [];

  if (userDebts.length > 0) {
    const payHistories = userDebts.map(debt => debt.payHistory);
    payHistories.forEach(payHistory => paidDebts.push(...payHistory));
    paidDebts.sort((a, b) => {
      return b.date.localeCompare(a.date);
    });
  }

  return { expenses, income, paidDebts, userDebts };
}

export default produceExpensesObject;
