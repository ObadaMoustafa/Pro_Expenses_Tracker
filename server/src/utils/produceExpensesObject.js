import Debts from "../models/debts.js";
import Expenses from "../models/Expenses.js";

async function produceExpensesObject(userId) {
  const userExpenses = await Expenses.findOne({ userId });
  const userDebts = await Debts.find({ userId });
  const { expenses, income } = userExpenses;

  // if the user doesn't has expenses
  // let totalExpenses = [];
  // let totalIncome = [];
  let paidDebts = [];

  // set totalExpenses
  // if (expenses.length > 0)
  //   expenses.forEach(category =>
  //     category.subcategory.forEach(subcategory =>
  //       totalExpenses.push(...subcategory.expenses)
  //     )
  //   );

  // if (income.length > 0)
  //   income.forEach(category => totalIncome.push(...category.income));

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
