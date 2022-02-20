import { createContext, useEffect, useState } from "react";
import { sumArrayValues } from "../utils/expensesCalculation";

export const expensesContext = createContext();
export const ExpensesProvider = ({ children }) => {
  const [userExpenses, setUserExpenses] = useState({
    expenses: [],
    income: [],
    paidDebts: [],
  });

  // specially for filtration to keep the original data
  const [expensesArray, setExpensesArray] = useState(userExpenses.expenses);
  const [incomeArray, setIncomeArray] = useState(userExpenses.income);
  //^ paidDebtsArray is only for overview Page
  const [paidDebtsArray, setPaidDebtsArray] = useState(userExpenses.paidDebts);

  function updateExpensesArrays() {
    setExpensesArray(userExpenses.expenses);
    setIncomeArray(userExpenses.income);
    setPaidDebtsArray(userExpenses.paidDebts);
  }

  const [totalBalance, setTotalBalance] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalPaidDebts, setTotalPaidDebts] = useState(0);

  // change the results when the arrays states changed .. that guarantee to keep the original data and present the filtered one
  useEffect(() => {
    const { expenses, income, paidDebts } = userExpenses;
    expenses.length > 0
      ? setTotalExpenses(sumArrayValues(expenses))
      : setTotalExpenses(0);
    income.length > 0
      ? setTotalIncome(sumArrayValues(income))
      : setTotalIncome(0);
    paidDebts.length > 0
      ? setTotalPaidDebts(sumArrayValues(paidDebts))
      : setTotalPaidDebts(0);
  }, [userExpenses]);

  // calculating the balance to be dynamic with transactions;
  useEffect(() => {
    const totalBalance = totalIncome - totalExpenses - totalPaidDebts;
    setTotalBalance(totalBalance);
  }, [totalIncome, totalExpenses, totalPaidDebts]);

  const sharedValues = {
    userExpenses,
    setUserExpenses,
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
