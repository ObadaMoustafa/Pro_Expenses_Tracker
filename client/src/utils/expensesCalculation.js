// this function to turn the original expenses array into an array of all transactions
export function getAllExpensesTransactions(originalExpensesArray) {
  let expensesTransactions = [];
  originalExpensesArray.forEach(category =>
    category.subcategory.forEach(subcategory =>
      expensesTransactions.push(...subcategory.expenses)
    )
  );
  return expensesTransactions;
}

// this function to turn the original income array into an array of all transactions
export function getAllIncomeTransactions(originalIncomeArray) {
  let incomeTransactions = [];
  originalIncomeArray.forEach(category =>
    incomeTransactions.push(...category.income)
  );
  return incomeTransactions;
}

// these functions are used to calculate the expenses
export function sumExpensesValues(originalExpensesArray) {
  let allExpenses = [];
  originalExpensesArray.forEach(category =>
    category.subcategory.forEach(subcategory =>
      allExpenses.push(...subcategory.expenses)
    )
  );
  const numbers = allExpenses.map(obj => obj.amount);
  const sum = numbers.reduce((a, b) => a + b, 0);
  return sum;
}

export function sumIncomeValues(originalIncomeArray) {
  let allIncome = [];
  originalIncomeArray.forEach(category => allIncome.push(...category.income));
  const numbers = allIncome.map(obj => obj.amount);
  const sum = numbers.reduce((a, b) => a + b, 0);
  return sum;
}

export function sumDebtsValues(arrayOfTransactions) {
  const numbers = arrayOfTransactions.map(obj => obj.amount);
  const sum = numbers.reduce((a, b) => a + b, 0);
  return sum;
}
