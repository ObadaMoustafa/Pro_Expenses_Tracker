import React, { useState } from "react";
import AddExpensesOption from "../../../components/add_expenses/AddExpensesOption";
import AddExpensesForm from "../../../components/Forms/AddExpensesForm";

function AddDifferentExpenses() {
  //write code here
  const [isExpensesFrom, setIsExpensesForm] = useState(false);
  const [isIncomeFrom, setIsIncomeForm] = useState(false);

  function showExpensesForm() {
    setIsExpensesForm((pre) => !pre);
    setIsIncomeForm(false);
    window.location.href = "#form-section";
  }

  function showIncomeForm() {
    setIsExpensesForm(false);
    setIsIncomeForm((pre) => !pre);
    window.location.href = "#form-section";
  }
  return (
    <>
      <div className="add-expenses-container">
        <div className="add-expenses-buttons">
          <AddExpensesOption
            header="Expenses"
            onClick={showExpensesForm}
            buttonText={isExpensesFrom ? "-" : "+"}
          />
          <AddExpensesOption
            header="Income"
            onClick={showIncomeForm}
            buttonText={isIncomeFrom ? "-" : "+"}
          />
          <AddExpensesOption header="debts" buttonText="+" />
        </div>
      </div>
      <div id="form-section">
        {isExpensesFrom && <AddExpensesForm type="addExpenses" />}
        {isIncomeFrom && <AddExpensesForm type="addIncome" />}
      </div>
    </>
  );
}

export default AddDifferentExpenses;
