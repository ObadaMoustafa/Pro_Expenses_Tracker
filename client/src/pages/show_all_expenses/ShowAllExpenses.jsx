import React, { useContext } from "react";
import { expensesContext } from "../../context/expensesContext";
import ExpensesTransaction from "./components/ExpensesTransaction";

function ShowAllExpenses() {
  //write code here
  const { userExpenses } = useContext(expensesContext);
  const { expenses, income } = userExpenses;
  return (
    <>
      <h2>
        This is all your expenses transactions and you can also show by date
        range
      </h2>
      <div className="expenses-transactions-container">
        {expenses &&
          expenses.map((singleExpenses) => (
            <ExpensesTransaction
              title={singleExpenses.title}
              amount={singleExpenses.amount}
              transactionId={singleExpenses._id}
              date={singleExpenses.date}
              type="expenses"
              key={singleExpenses._id}
            />
          ))}
      </div>
    </>
  );
}

export default ShowAllExpenses;
