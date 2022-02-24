import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { expensesContext } from "../../context/expensesContext";
import FilterByDateForm from "../forms/FilterByDateForm";
import ExpensesTransaction from "./ExpensesTransaction";
import AddExpensesForm from "../forms/AddExpensesForm";
import FormsButtonsBar from "./FormsButtonsBar";

function ShowAllTransactions({ type, headerTitle }) {
  const { userExpenses, expensesArray, updateExpensesArrays, incomeArray } =
    useContext(expensesContext);
  const { expenses, income, paidDebts } = userExpenses;
  // specify which array gonna use from expenses context
  let transactionArray;
  if (type === "expenses") transactionArray = expensesArray;
  else if (type === "income") transactionArray = incomeArray;
  //TODO still need paid debts transactions

  const [shouldShowFilterForm, setShouldShowFilterForm] = useState(false);
  const [shouldShowAddForm, setShouldShowAddForm] = useState(false);

  function showFilterForm(e) {
    setShouldShowFilterForm(true);
    setShouldShowAddForm(false);
  }

  function showِAddForm(e) {
    setShouldShowFilterForm(false);
    setShouldShowAddForm(true);
  }

  function hideForms() {
    setShouldShowFilterForm(false);
    setShouldShowAddForm(false);
  }

  useEffect(() => {
    updateExpensesArrays(expenses, income, paidDebts);
  }, []);

  const formBar = [
    {
      icon: "fas fa-filter",
      func: showFilterForm,
    },
    {
      icon: "fas fa-plus-circle",
      func: showِAddForm,
    },
  ];
  return (
    <>
      <FormsButtonsBar hideFormsFunc={hideForms} buttons={formBar} />
      {shouldShowFilterForm && <FilterByDateForm type={type} />}
      {shouldShowAddForm && <AddExpensesForm type={type} />}
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
  type: PropTypes.oneOf(["expenses", "income"]).isRequired,
  headerTitle: PropTypes.string,
};
export default ShowAllTransactions;
