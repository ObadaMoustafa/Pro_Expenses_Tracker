import React, { useContext, useEffect, useState } from "react";
import FilterByDateForm from "../../components/forms/FilterByDateForm";
import { expensesContext } from "../../context/expensesContext";
import ExpensesTransaction from "../../components/ExpensesTransaction";
import AddExpensesForm from "../../components/forms/AddExpensesForm";
import AddExpensesOption from "../../components/add_expenses/AddExpensesOption";

function ShowAllIncome() {
  //write code here
  const { incomeArray, updateExpensesArrays } = useContext(expensesContext);
  const [shouldShowForm, setShouldShowForm] = useState(false);
  function showForm() {
    setShouldShowForm((prev) => !prev);
    window.location.href = "#add_expenses_form";
  }
  useEffect(() => {
    updateExpensesArrays();
  }, []);
  return (
    <>
      <h2>All income Transactions</h2>
      <FilterByDateForm type="income" />
      <div className="expenses-transactions-container">
        {incomeArray.map((singleExpenses) => (
          <ExpensesTransaction
            title={singleExpenses.title}
            amount={singleExpenses.amount}
            transactionId={singleExpenses._id}
            date={singleExpenses.date}
            key={singleExpenses._id}
            type="income"
          />
        ))}
      </div>
      <AddExpensesOption
        header="Add"
        buttonText={shouldShowForm ? "-" : "+"}
        onClick={showForm}
      />
      <div id="add_expenses_form">
        {shouldShowForm && <AddExpensesForm type="income" />}
      </div>
    </>
  );
}

export default ShowAllIncome;
