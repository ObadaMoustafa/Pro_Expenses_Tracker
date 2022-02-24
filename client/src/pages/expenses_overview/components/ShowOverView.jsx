import React, { useContext } from "react";
import { expensesContext } from "../../../context/expensesContext";
import ResultCard from "./ResultCard";
import FilterByDateForm from "../../../components/forms/FilterByDateForm";

function ShowOverView() {
  //write code here
  const { totalBalance, totalIncome, totalExpenses, totalPaidDebts } =
    useContext(expensesContext);

  return (
    <>
      <FilterByDateForm type="overview" />

      <div className="result-cards-container">
        <ResultCard title="Balance" amount={totalBalance} />
        <ResultCard title="Income" amount={totalIncome} />
        <ResultCard title="Expenses" amount={totalExpenses} />
        <ResultCard title="Paid Debts" amount={totalPaidDebts} />
      </div>
    </>
  );
}

export default ShowOverView;
