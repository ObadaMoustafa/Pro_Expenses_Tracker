import React, { useContext, useEffect, useState } from "react";
import FilterByDateForm from "../../components/forms/FilterByDateForm";
import { expensesContext } from "../../context/expensesContext";
import ExpensesTransaction from "../../components/ExpensesTransaction";
import AddExpensesForm from "../../components/forms/AddExpensesForm";
import AddExpensesOption from "../../components/add_expenses/AddExpensesOption";

function ShowAllExpenses() {
  //write code here
  const {
    userExpenses,
    expensesArray,
    setExpensesArray,
    setIncomeArray,
    setPaidDebtsArray,
  } = useContext(expensesContext);
  const { expenses, income, paidDebts } = userExpenses;
  const [shouldShowForm, setShouldShowForm] = useState(false);
  function showForm() {
    setShouldShowForm((prev) => !prev);
    window.location.href = "#add_expenses_form";
  }
  useEffect(() => {
    setExpensesArray(expenses);
    setIncomeArray(income);
    setPaidDebtsArray(paidDebts);
  }, []);
  return (
    <>
      <h2>All Expenses Transactions without paid debts</h2>
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
