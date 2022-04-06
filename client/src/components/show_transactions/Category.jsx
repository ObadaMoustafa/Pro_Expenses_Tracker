import React, { useState } from "react";
import PropTypes from "prop-types";
import Subcategory from "./Subcategory";
import ExpensesTransaction from "./ExpensesTransaction";
import DeleteConfirmationForm from "../forms/DeleteConfirmationForm";

function Category({ categoryTitle, options = [], categoryId, type }) {
  //write code here
  const [isDeleteMsg, setIsDeleteMsg] = useState(false);

  function deleteCategory(e) {
    setIsDeleteMsg(true);
    console.log(categoryId);
  }

  return (
    <>
      <div className="category-card-container">
        <div className="category-card-icons debt-card-header-icons">
          <i
            className="fas fa-trash-alt"
            title="Delete Debt"
            onClick={deleteCategory}></i>
        </div>
        <details className="category-card" open>
          <summary className="category-card-title">
            Category: <span>{categoryTitle}</span>
          </summary>
          {type === "expenses" ? (
            options.map(subcategory => (
              <Subcategory
                key={subcategory._id}
                title={subcategory.title}
                expenses={subcategory.expenses}
                type={type}
              />
            ))
          ) : (
            <div className="transactions-container">
              {options.map(income => (
                <ExpensesTransaction
                  key={income._id}
                  type={type}
                  title={income.title}
                  date={income.date}
                  amount={income.amount}
                  transactionId={income._id}
                />
              ))}
            </div>
          )}
        </details>
      </div>
      {isDeleteMsg && (
        <DeleteConfirmationForm
          msg="Do you want to delete the whole category ? this will affect your balance calculation"
          setHideForm={setIsDeleteMsg}
        />
      )}
    </>
  );
}

Category.propTypes = {
  categoryTitle: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  categoryId: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["expenses", "income"]).isRequired,
};
export default Category;
