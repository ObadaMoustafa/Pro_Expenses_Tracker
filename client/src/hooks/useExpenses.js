import { useState } from "react";
import { resultByDateRange } from "../utils/expensesCalculation";

const useExpenses = (userExpenses, from, to) => {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalPaidDebts, setTotalPaidDebts] = useState(0);
  if (userExpenses) {
    const { expenses, income, debts } = userExpenses;
    if (expenses) resultByDateRange(expenses, from, to, setTotalExpenses);
    if (income) resultByDateRange(income, from, to, setTotalIncome);
    if (debts) resultByDateRange(debts, from, to, setTotalPaidDebts);
  }

  return { totalExpenses, totalIncome, totalPaidDebts };
};

export default useExpenses;
