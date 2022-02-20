import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { expensesContext } from "../../context/expensesContext";
import FilterByDateForm from "../forms/FilterByDateForm";
import ExpensesTransaction from "./ExpensesTransaction";
import AddExpensesForm from "../forms/AddExpensesForm";
import PayDebtsForm from "../forms/PayDebtsForm";
import { debtsContext } from "../../context/debtsContext";

function ShowAllTransactions({ type, headerTitle }) {
  const { expensesArray, updateExpensesArrays, incomeArray } =
    useContext(expensesContext);

  const { forFilterDebtsTransactions } = useContext(debtsContext);
  // specify which array gonna use from expenses context
  let transactionArray;
  if (type === "expenses") transactionArray = expensesArray;
  else if (type === "income") transactionArray = incomeArray;
  else if (type === "paidDebts") transactionArray = forFilterDebtsTransactions;
  //TODO still need paid debts transactions

  const [shouldShowFilterForm, setShouldShowFilterForm] = useState(false);
  const [shouldShowAddForm, setShouldShowAddForm] = useState(false);

  function showFilterForm(e) {
    e.stopPropagation();
    setShouldShowFilterForm(true);
    setShouldShowAddForm(false);
  }

  function showِAddForm(e) {
    e.stopPropagation();
    setShouldShowFilterForm(false);
    setShouldShowAddForm(true);
  }

  function hideForms() {
    setShouldShowFilterForm(false);
    setShouldShowAddForm(false);
  }

  useEffect(() => {
    updateExpensesArrays();
  }, []);

  return (
    <>
      <div className="forms-buttons">
        <div className="forms-buttons-icon" onClick={showFilterForm}>
          <i className="fas fa-filter"></i>
        </div>
        <div className="forms-buttons-icon" onClick={showِAddForm}>
          <i className="fas fa-plus-circle"></i>
        </div>
        <div
          className="forms-buttons-icon"
          onClick={hideForms}
          title="hide forms"
        >
          <i className="fas fa-eye-slash"></i>
        </div>
      </div>
      {shouldShowFilterForm && <FilterByDateForm type={type} />}
      {shouldShowAddForm && (type === "expenses" || type === "income") && (
        <AddExpensesForm type={type} />
      )}
      {shouldShowAddForm && type === "paidDebts" && <PayDebtsForm />}
      <h2 className="section-title">{headerTitle}</h2>
      <div className="expenses-transactions-container">
        {transactionArray.map((singleExpenses) => (
          <ExpensesTransaction
            title={singleExpenses.title}
            date={singleExpenses.date}
            amount={singleExpenses.amount}
            transactionId={singleExpenses._id}
            key={singleExpenses._id}
            type={type}
          />
        ))}
      </div>
    </>
  );
}

ShowAllTransactions.propTypes = {
  type: PropTypes.oneOf(["expenses", "income", "paidDebts"]).isRequired,
  headerTitle: PropTypes.string,
};
export default ShowAllTransactions;
