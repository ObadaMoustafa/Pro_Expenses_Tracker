import React from "react";
import PropTypes from "prop-types";
import ExpensesTransaction from "./ExpensesTransaction";

function Subcategory({ title, expenses, type, categoryId, subcategoryId }) {
  //write code here
  return (
    <details className="category-card-sub" open>
      <summary className="category-card-sub-title">
        Subcategory: <span>{title}</span>
      </summary>
      <div className="transactions-container">
        {expenses.map(expense => (
          <ExpensesTransaction
            key={expense._id}
            type={type}
            title={expense.title}
            date={expense.date}
            amount={expense.amount}
            transactionId={expense._id}
            categoryId={categoryId}
            subcategoryId={subcategoryId}
          />
        ))}
      </div>
    </details>
  );
}

Subcategory.propTypes = {
  title: PropTypes.string.isRequired,
  expenses: PropTypes.array.isRequired,
  type: PropTypes.oneOf(["expenses", "income"]).isRequired,
  categoryId: PropTypes.string.isRequired,
  subcategoryId: PropTypes.string.isRequired,
};
export default Subcategory;
