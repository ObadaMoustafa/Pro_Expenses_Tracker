import React, { useContext, useEffect } from "react";
import FilterByDateForm from "../../components/forms/FilterByDateForm";
import { expensesContext } from "../../context/expensesContext";
import ExpensesTransaction from "./components/ExpensesTransaction";

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

  useEffect(() => {
    setExpensesArray(expenses);
    setIncomeArray(income);
    setPaidDebtsArray(paidDebts);
  }, []);
  return (
    <>
      <h2>
        This is all your expenses transactions and you can also show by date
        range
      </h2>
      <FilterByDateForm />
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
    </>
  );
}

export default ShowAllExpenses;
