import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import useFetch from "../../hooks/useFetch";
import { userContext } from "../../context/userContext";
import { expensesContext } from "../../context/expensesContext";
import fetchOptions from "../../utils/fetchOptions";
import LoadingOrError from "../loading_and_errors/LoadingOrError";

function ExpensesTransaction({
  categoryId,
  subcategoryId,
  transactionId,
  title,
  amount,
  type,
  date,
}) {
  //write code here
  const { currentUser } = useContext(userContext);
  const {
    setUserExpenses,
    userExpenses,
    userDebts,
    setExpensesArray,
    setIncomeArray,
  } = useContext(expensesContext);

  let deleteApiPath;
  if (type === "expenses")
    deleteApiPath = `/expenses/deleteExpenses/${currentUser._id}`;
  if (type === "income")
    deleteApiPath = `/expenses/deleteIncome/${currentUser._id}/${transactionId}`;

  const { performFetch, cancelFetch, isLoading, error } = useFetch(
    deleteApiPath,
    async res => {
      if (type === "expenses") {
        await setUserExpenses(res.result);
        //^ should do something to update the expenses array
      } else if (type === "income") {
        await setUserExpenses(res.result);
        //^ should do something to update the expenses array
      }
    }
  );

  useEffect(() => {
    return () => cancelFetch();
  }, [userExpenses, userDebts]);

  function deleteTransaction() {
    const reqBody = {
      categoryId,
      subcategoryId,
      transactionId,
    };
    performFetch(fetchOptions("DELETE", reqBody));
  }
  return (
    <>
      <LoadingOrError
        isLoading={isLoading}
        isErr={error ? true : false}
        errMsg={error}
      />
      <div className="expenses-transaction">
        <div className="expenses-transaction-part1">
          <p className="expenses-transaction-part1-title">{title}</p>
          <p className="expenses-transaction-part1-date">{date}</p>
          <p className="expenses-transaction-part1-amount">
            {amount} {currentUser.currency}
          </p>
        </div>
        <div className="expenses-transaction-part2">
          <i className="fas fa-trash" onClick={deleteTransaction}></i>
        </div>
      </div>
    </>
  );
}

ExpensesTransaction.propTypes = {
  transactionId: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
  subcategoryId: PropTypes.string,
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["expenses", "income"]).isRequired,
  date: PropTypes.string.isRequired,
};
export default ExpensesTransaction;
