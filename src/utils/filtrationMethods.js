import {
  getAllExpensesTransactions,
  getAllIncomeTransactions,
} from "./expensesCalculation";

// this function expects the following
//1- arr = the array of only transactions without categories.
//2&3 from and to = dates to filter the data and calculate the amount keys inside it
export function filterTransactionsByRangeDates(arr = [], from, to) {
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
  // this is the whole filtering function for expenses, income, debts and balance in the overview page.
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

export function filterExpensesData(originalArray, categories, from, to) {
  // this is the whole filtering function for expenses in expenses page.
  //1- filter the expenses transactions by categories
  let filteredCategories = originalArray;

  if (categories.length > 0) {
    filteredCategories = [];
    originalArray.forEach(category => {
      if (categories.includes(category.category)) {
        filteredCategories.push(category);
      }
    });
  }

  //2- filter the income transactions by dates
  if (from !== "" && to !== "") {
    let filteredTransactions = [];
    filteredCategories.forEach(category => {
      category.subcategories.forEach(subcategory => {
        const filteredTransactions = filterTransactionsByRangeDates(
          subcategory.expenses,
          from,
          to
        );
        subcategory.expenses = filteredTransactions;
      });

      // delete empty subcategories
      category.subcategories = category.subcategories.filter(
        subcategory => subcategory.expenses.length > 0
      );

      // after filtering all transactions in each subcategory, push the category to the final array
      filteredTransactions.push(category);
    });

    // delete empty categories
    filteredTransactions = filteredCategories.filter(
      category => category.subcategories.length > 0
    );
    return filteredTransactions;
  }
  return filteredCategories;
}

export function filterIncomeData(originalArray, categories, from, to) {
  // this is the whole filtering function for income in income page.
  //1- filter the income transactions by categories
  let filteredCategories = originalArray;

  if (categories.length > 0) {
    filteredCategories = [];
    originalArray.forEach(category => {
      if (categories.includes(category.category)) {
        filteredCategories.push(category);
      }
    });
  }

  //2- filter the income transactions by dates
  if (from !== "" && to !== "") {
    let filteredTransactions = [];
    filteredCategories.forEach(category => {
      category.income = filterTransactionsByRangeDates(
        category.income,
        from,
        to
      );

      filteredTransactions.push(category);
    });
    filteredTransactions = filteredTransactions.filter(
      category => category.income.length > 0
    );
    return filteredTransactions;
  }
  return filteredCategories;
}
