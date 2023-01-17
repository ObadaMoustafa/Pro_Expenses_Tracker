import { useState } from "react";
import { filterTransactionsByRangeDates } from "../utils/filtrationMethods";

const useExpenses = (userExpenses, from, to) => {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalPaidDebts, setTotalPaidDebts] = useState(0);
  if (userExpenses) {
    const { expenses, income, debts } = userExpenses;
    if (expenses)
      filterTransactionsByRangeDates(expenses, from, to, setTotalExpenses);
    if (income)
      filterTransactionsByRangeDates(income, from, to, setTotalIncome);
    if (debts)
      filterTransactionsByRangeDates(debts, from, to, setTotalPaidDebts);
  }

  return { totalExpenses, totalIncome, totalPaidDebts };
};

export default useExpenses;
