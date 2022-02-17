import React, { useContext } from "react";
import PropTypes from "prop-types";
import { expensesContext } from "../../../context/expensesContext";
import ResultCard from "./ResultCard";
import FilterByDateForm from "../../../components/forms/FilterByDateForm";

function ShowOverView() {
  //write code here
  const { totalBalance, totalIncome, totalExpenses, totalPaidDebts } =
    useContext(expensesContext);

  return (
    <>
      <FilterByDateForm />

      <div className="result-cards-container">
        <ResultCard title="Balance" amount={totalBalance} />
        <ResultCard title="Income" amount={totalIncome} />
        <ResultCard title="Expenses" amount={totalExpenses} />
        <ResultCard title="Paid Debts" amount={totalPaidDebts} />
      </div>
    </>
  );
}

ShowOverView.propTypes = {};
export default ShowOverView;
