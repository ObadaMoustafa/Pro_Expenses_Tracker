import {
  getAllExpensesTransactions,
  getAllIncomeTransactions,
} from "./expensesCalculation";

// this function expects the following
//1- arr = the array of transactions.
//2&3 from and to = dates to filter the data and calculate the amount keys inside it
export function filterTransactionsByRangeDates(arr, from, to) {
  if (arr.length > 0) {
    const wantedDatesArr = arr.filter(
      obj => obj.date >= from && obj.date <= to
    );
    return wantedDatesArr;
  } else {
    return [];
  }
}

export function filterOverviewData(userExpenses, from, to, updateFunction) {
  const { expenses, income, paidDebts } = userExpenses;
  let filteredExpenses = [];
  let filteredIncome = [];
  let filteredPaidDebts = [];

  if (expenses.length > 0) {
    const expensesTransactions = getAllExpensesTransactions(expenses);
    filteredExpenses = filterTransactionsByRangeDates(
      expensesTransactions,
      from,
      to
    );
  }
  if (income.length > 0) {
    const incomeTransactions = getAllIncomeTransactions(income);
    filteredIncome = filterTransactionsByRangeDates(
      incomeTransactions,
      from,
      to
    );
  }
  if (paidDebts.length > 0) {
    filteredPaidDebts = filterTransactionsByRangeDates(paidDebts, from, to);
  }
  // don't use original argument because we already transform it before filtering.
  updateFunction(filteredExpenses, filteredIncome, filteredPaidDebts);
}
