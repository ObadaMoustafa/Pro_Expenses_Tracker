import React, { useState } from "react";
import AddExpenses from "../../../components/add_expenses/AddExpenses";
import AddExpensesForm from "../../../components/Form/AddExpensesForm";

function NoRecord() {
  //write code here
  const [isExpensesFrom, setIsExpensesForm] = useState(false);

  function showExpensesForm() {
    setIsExpensesForm(true);
  }
  return (
    <>
      <div className="add-expenses-container">
        <p className="add-expenses-header">
          At least you need to add one expenses to show the overview page
        </p>
        <div className="add-expenses-buttons">
          <AddExpenses header="Expenses" onClick={showExpensesForm} />
          <AddExpenses header="Income" />
          <AddExpenses header="debts" />
        </div>
      </div>
      {isExpensesFrom && <AddExpensesForm />}
    </>
  );
}

export default NoRecord;
