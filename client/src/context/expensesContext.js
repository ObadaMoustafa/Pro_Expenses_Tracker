import { createContext, useEffect, useState } from "react";
import { sumArrayValues } from "../utils/expensesCalculation";

export const expensesContext = createContext();
export const ExpensesProvider = ({ children }) => {
  const [userExpenses, setUserExpenses] = useState(null);

  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [debts, setDebts] = useState(0);

  useEffect(() => {
    if (userExpenses) {
      const { expenses, income, debts } = userExpenses;
      if (expenses) setExpenses(sumArrayValues(expenses));
      if (income) setIncome(sumArrayValues(income));
      if (debts) setDebts(sumArrayValues(debts));
    }
  }, [userExpenses]);

  // calculating the balance to be dynamic with transactions;
  useEffect(() => {
    const totalBalance = income - expenses - debts;
    setBalance(totalBalance);
  }, [income, expenses, debts]);

  const sharedValues = {
    userExpenses,
    setUserExpenses,
    balance,
    setBalance,
    income,
    setIncome,
    expenses,
    setExpenses,
    debts,
    setDebts,
  };
  return (
    <expensesContext.Provider value={sharedValues}>
      {children}
    </expensesContext.Provider>
  );
};
