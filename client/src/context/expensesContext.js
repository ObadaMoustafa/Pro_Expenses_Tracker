import { createContext, useEffect, useState } from "react";
import { sumArrayValues } from "../utils/expensesCalculation";

export const expensesContext = createContext();
export const ExpensesProvider = ({ children }) => {
  const [userExpenses, setUserExpenses] = useState({
    expenses: [],
    income: [],
    debts: [],
  });

  // specially for filtration to keep the original data
  const [expensesArray, setExpensesArray] = useState(userExpenses.expenses);
  const [incomeArray, setIncomeArray] = useState(userExpenses.income);
  const [debtsArray, setDebtsArray] = useState(userExpenses.debts);

  // first lets change the they arrays every time userExpenses change
  useEffect(() => {
    setExpensesArray(userExpenses.expenses);
    setIncomeArray(userExpenses.income);
    setDebtsArray(userExpenses.debts);
    console.log("context changed", userExpenses);
  }, [userExpenses]);

  const [totalBalance, setTotalBalance] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalDebts, setTotalDebts] = useState(0);

  // change the results when the arrays states changed .. that guarantee to keep the original data and present the filtered one
  useEffect(() => {
    expensesArray.length > 0
      ? setTotalExpenses(sumArrayValues(expensesArray))
      : setTotalExpenses(0);
    incomeArray.length > 0
      ? setTotalIncome(sumArrayValues(incomeArray))
      : setTotalIncome(0);
    debtsArray.length > 0
      ? setTotalDebts(sumArrayValues(debtsArray))
      : setTotalDebts(0);
    console.log("Arrays chanced", { expensesArray, incomeArray, debtsArray });
  }, [expensesArray, incomeArray, debtsArray]);

  // calculating the balance to be dynamic with transactions;
  useEffect(() => {
    const totalBalance = totalIncome - totalExpenses - totalDebts;
    setTotalBalance(totalBalance);
  }, [totalIncome, totalExpenses, totalDebts]);

  const sharedValues = {
    userExpenses,
    setUserExpenses,
    expensesArray,
    setExpensesArray,
    incomeArray,
    setIncomeArray,
    debtsArray,
    setDebtsArray,
    totalBalance,
    setTotalBalance,
    totalExpenses,
    setTotalExpenses,
    totalIncome,
    setTotalIncome,
    totalDebts,
    setTotalDebts,
  };
  return (
    <expensesContext.Provider value={sharedValues}>
      {children}
    </expensesContext.Provider>
  );
};
