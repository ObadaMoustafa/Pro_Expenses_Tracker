import { createContext, useEffect, useMemo, useState } from "react";
import {
  getAllExpensesTransactions,
  getAllIncomeTransactions,
  sumDebtsValues,
} from "../utils/expensesCalculation";

export const expensesContext = createContext();
export const ExpensesProvider = ({ children }) => {
  // this is original expenses data
  const [userExpenses, setUserExpenses] = useState({
    expenses: [],
    income: [],
    paidDebts: [],
  });

  //^ these states for overview page only to calculate the expenses and income
  // these states should be an array of all transactions.
  const [expensesTransactions, setExpensesTransactions] = useState(
    getAllExpensesTransactions(userExpenses.expenses)
  );
  const [incomeTransactions, setIncomeTransactions] = useState(
    getAllIncomeTransactions(userExpenses.income)
  );
  const [paidDebtsTransactions, setPaidDebtsTransactions] = useState(
    userExpenses.paidDebts
  );

  const [totalBalance, setTotalBalance] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalPaidDebts, setTotalPaidDebts] = useState(0);

  function updateOverviewPage(expenses, income, paidDebts, type) {
    if (type === "original") {
      setExpensesTransactions(getAllExpensesTransactions(expenses));
      setIncomeTransactions(getAllIncomeTransactions(income));
    } else {
      setExpensesTransactions(expenses);
      setIncomeTransactions(income);
    }
    setPaidDebtsTransactions(paidDebts);
  }
  useMemo(() => {
    const { expenses, income, paidDebts } = userExpenses;
    updateOverviewPage(expenses, income, paidDebts, "original");
  }, [userExpenses]);

  // change the results when the arrays states changed .. that guarantee to keep the original data and present the filtered one
  useEffect(() => {
    expensesTransactions.length > 0
      ? setTotalExpenses(sumDebtsValues(expensesTransactions))
      : setTotalExpenses(0);
    incomeTransactions.length > 0
      ? setTotalIncome(sumDebtsValues(incomeTransactions))
      : setTotalIncome(0);
    paidDebtsTransactions.length > 0
      ? setTotalPaidDebts(sumDebtsValues(paidDebtsTransactions))
      : setTotalPaidDebts(0);
  }, [expensesTransactions, incomeTransactions, paidDebtsTransactions]);

  // calculating the balance to be dynamic with transactions;
  useMemo(() => {
    const totalBalance = totalIncome - totalExpenses - totalPaidDebts;
    setTotalBalance(totalBalance);
  }, [totalIncome, totalExpenses, totalPaidDebts]);
  //* end of overview page calculations

  // specially for filtration to keep the original data
  const [expensesArray, setExpensesArray] = useState(userExpenses.expenses);
  const [incomeArray, setIncomeArray] = useState(userExpenses.income);

  // to calculate the total amount when filtering.
  useEffect(() => {
    setTotalIncome(sumDebtsValues(getAllIncomeTransactions(incomeArray)));
  }, [incomeArray]);
  useEffect(() => {
    setTotalExpenses(sumDebtsValues(getAllExpensesTransactions(expensesArray)));
  }, [expensesArray]);

  function updateExpensesArrays(expenses, income) {
    setExpensesArray(expenses);
    setIncomeArray(income);
  }

  //^ gonna delete this function to control the filtration mode
  useMemo(() => {
    const { expenses, income } = userExpenses;
    updateExpensesArrays(expenses, income);
  }, [userExpenses]);

  const sharedValues = {
    userExpenses,
    setUserExpenses,
    expensesTransactions,
    incomeTransactions,
    updateOverviewPage,
    expensesArray,
    setExpensesArray,
    incomeArray,
    setIncomeArray,
    paidDebtsTransactions,
    setPaidDebtsTransactions,
    totalBalance,
    setTotalBalance,
    totalExpenses,
    setTotalExpenses,
    totalIncome,
    setTotalIncome,
    totalPaidDebts,
    setTotalPaidDebts,
    updateExpensesArrays,
  };
  return (
    <expensesContext.Provider value={sharedValues}>
      {children}
    </expensesContext.Provider>
  );
};
