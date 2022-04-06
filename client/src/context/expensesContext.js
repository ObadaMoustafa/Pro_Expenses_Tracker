import { createContext, useEffect, useMemo, useState } from "react";
import {
  getAllExpensesTransactions,
  getAllIncomeTransactions,
  sumDebtsValues,
} from "../utils/expensesCalculation";

export const expensesContext = createContext();
export const ExpensesProvider = ({ children }) => {
  const [userExpenses, setUserExpenses] = useState({
    expenses: [],
    income: [],
    paidDebts: [],
  });

  //^ these state for overview page only to calculate the expenses and income
  const [expensesTransactions, setExpensesTransactions] = useState(
    getAllExpensesTransactions(userExpenses.expenses)
  );
  const [incomeTransactions, setIncomeTransactions] = useState(
    getAllIncomeTransactions(userExpenses.income)
  );
  const [paidDebtsArray, setPaidDebtsArray] = useState(userExpenses.paidDebts);

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
    setPaidDebtsArray(paidDebts);
  }
  useMemo(() => {
    console.log("userExpenses", userExpenses);
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
    paidDebtsArray.length > 0
      ? setTotalPaidDebts(sumDebtsValues(paidDebtsArray))
      : setTotalPaidDebts(0);
  }, [expensesTransactions, incomeTransactions, paidDebtsArray]);

  // calculating the balance to be dynamic with transactions;
  useEffect(() => {
    const totalBalance = totalIncome - totalExpenses - totalPaidDebts;
    setTotalBalance(totalBalance);
  }, [totalIncome, totalExpenses, totalPaidDebts]);

  // specially for filtration to keep the original data
  const [expensesArray, setExpensesArray] = useState(userExpenses.expenses);
  const [incomeArray, setIncomeArray] = useState(userExpenses.income);

  function updateExpensesArrays(expenses, income, paidDebts) {
    setExpensesArray(expenses);
    setIncomeArray(income);
    setPaidDebtsArray(paidDebts);
  }

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
    paidDebtsArray,
    setPaidDebtsArray,
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
