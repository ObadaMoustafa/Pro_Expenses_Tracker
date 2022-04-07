import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Subcategory from "./Subcategory";
import ExpensesTransaction from "./ExpensesTransaction";
import DeleteConfirmationForm from "../forms/DeleteConfirmationForm";
import { userContext } from "../../context/userContext";
import useFetch from "../../hooks/useFetch";
import { expensesContext } from "../../context/expensesContext";
import fetchOptions from "../../utils/fetchOptions";
import LoadingOrError from "../loading_and_errors/LoadingOrError";

function Category({ categoryTitle, options = [], categoryId, type }) {
  //write code here
  const [isDeleteMsg, setIsDeleteMsg] = useState(false);
  const { currentUser } = useContext(userContext);
  const { userExpenses, setUserExpenses } = useContext(expensesContext);
  const { performFetch, isLoading, error, cancelFetch } = useFetch(
    `/expenses/deleteExpensesCategory/${currentUser._id}/${categoryId}`,
    res => setUserExpenses(res.result)
  );
  useEffect(() => {
    return cancelFetch();
  }, [userExpenses]);

  function deleteCategory(e) {
    e.preventDefault();
    setIsDeleteMsg(false);
    performFetch(fetchOptions("DELETE"));
  }

  function showAlertMsg(e) {
    setIsDeleteMsg(true);
    console.log(categoryId);
  }

  return (
    <>
      <LoadingOrError
        isLoading={isLoading}
        errMsg={error}
        isErr={error ? true : false}
      />
      <div className="category-card-container">
        <div className="category-card-icons debt-card-header-icons">
          <i
            className="fas fa-trash-alt"
            title="Delete Debt"
            onClick={showAlertMsg}></i>
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
                categoryId={categoryId}
                subcategoryId={subcategory._id}
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
                  categoryId={categoryId}
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
          deleteFunc={deleteCategory}
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
