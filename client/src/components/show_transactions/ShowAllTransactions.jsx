import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { expensesContext } from "../../context/expensesContext";
import FilterByDateForm from "../forms/FilterByDateForm";
import AddExpensesForm from "../forms/AddExpensesForm";
import FormsButtonsBar from "./FormsButtonsBar";
import { userContext } from "../../context/userContext";
import Category from "./Category";
import FilterExpensesForm from "../forms/FilterExpensesForm";

function ShowAllTransactions({ type, headerTitle }) {
  const { currentUser } = useContext(userContext);
  const {
    userExpenses,
    expensesArray,
    updateExpensesArrays,
    incomeArray,
    totalExpenses,
    totalIncome,
  } = useContext(expensesContext);
  const { expenses, income, paidDebts } = userExpenses;
  // specify which array gonna use from expenses context
  let transactionArray;
  if (type === "expenses") transactionArray = expensesArray;
  else if (type === "income") transactionArray = incomeArray;

  const [shouldShowFilterForm, setShouldShowFilterForm] = useState(false);
  const [shouldShowAddForm, setShouldShowAddForm] = useState(false);

  function showFilterForm() {
    setShouldShowFilterForm(true);
    setShouldShowAddForm(false);
  }

  function showِAddForm() {
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

  const formBarIcons = [
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
      <FormsButtonsBar hideFormsFunc={hideForms} buttons={formBarIcons} />
      {shouldShowFilterForm && <FilterExpensesForm type={type} />}
      {shouldShowAddForm && <AddExpensesForm type={type} />}
      <h2 className="section-title">
        {headerTitle}:{" "}
        <span style={{ fontSize: "25pt", fontWeight: "400" }}>
          {type === "expenses"
            ? totalExpenses.toFixed(2)
            : totalIncome.toFixed(2)}{" "}
          {currentUser.currency}
        </span>{" "}
      </h2>
      <div className="expenses-transactions-container">
        {transactionArray.map(category => (
          <Category
            key={category._id}
            categoryTitle={category.category}
            options={
              type === "expenses" ? category.subcategories : category.income
            }
            categoryId={category._id}
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
