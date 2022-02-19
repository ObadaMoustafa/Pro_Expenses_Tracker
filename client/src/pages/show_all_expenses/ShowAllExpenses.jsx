import React, { useContext, useEffect, useState } from "react";
import FilterByDateForm from "../../components/forms/FilterByDateForm";
import { expensesContext } from "../../context/expensesContext";
import ExpensesTransaction from "../../components/ExpensesTransaction";
import AddExpensesForm from "../../components/forms/AddExpensesForm";
import AddExpensesOption from "../../components/add_expenses/AddExpensesOption";

function ShowAllExpenses() {
  //write code here
  const { expensesArray, updateExpensesArrays } = useContext(expensesContext);
  const [shouldShowForm, setShouldShowForm] = useState(false);
  function showForm() {
    if (!shouldShowForm) {
      setShouldShowForm(true);
      window.location.href = "#add_expenses_form";
    } else {
      setShouldShowForm(false);
      window.location.href = "#page-title";
    }
  }
  useEffect(() => {
    if (shouldShowForm) window.addEventListener("click", showForm);
    return () => window.removeEventListener("click", showForm);
  }, [shouldShowForm]);

  useEffect(() => {
    updateExpensesArrays();
  }, []);

  return (
    <>
      <h2 id="page-title">All Expenses Transactions without paid debts</h2>
      <FilterByDateForm type="expenses" />
      <div className="expenses-transactions-container">
        {expensesArray.map((singleExpenses) => (
          <ExpensesTransaction
            title={singleExpenses.title}
            amount={singleExpenses.amount}
            transactionId={singleExpenses._id}
            date={singleExpenses.date}
            key={singleExpenses._id}
            type="expenses"
          />
        ))}
      </div>
      <AddExpensesOption
        header="Add"
        buttonText={shouldShowForm ? "-" : "+"}
        onClick={showForm}
      />
      <div id="add_expenses_form">
        {shouldShowForm && <AddExpensesForm type="expenses" />}
      </div>
    </>
  );
}

export default ShowAllExpenses;
