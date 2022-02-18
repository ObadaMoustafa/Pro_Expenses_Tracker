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
  const [paidDebtsArray, setPaidDebtsArray] = useState(userExpenses.paidDebts);

  // first lets change the they arrays every time userExpenses change
  useEffect(() => {
    setExpensesArray(userExpenses.expenses);
    setIncomeArray(userExpenses.income);
    setPaidDebtsArray(userExpenses.paidDebts);
  }, [userExpenses]);

  const [totalBalance, setTotalBalance] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalPaidDebts, setTotalPaidDebts] = useState(0);

  // change the results when the arrays states changed .. that guarantee to keep the original data and present the filtered one
  useEffect(() => {
    expensesArray.length > 0
      ? setTotalExpenses(sumArrayValues(expensesArray))
      : setTotalExpenses(0);
    incomeArray.length > 0
      ? setTotalIncome(sumArrayValues(incomeArray))
      : setTotalIncome(0);
    paidDebtsArray.length > 0
      ? setTotalPaidDebts(sumArrayValues(paidDebtsArray))
      : setTotalPaidDebts(0);
  }, [expensesArray, incomeArray, paidDebtsArray]);

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
  };
  return (
    <expensesContext.Provider value={sharedValues}>
      {children}
    </expensesContext.Provider>
  );
};
