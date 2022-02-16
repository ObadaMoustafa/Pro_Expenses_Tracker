import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import useFetch from "../../../hooks/useFetch";
import { userContext } from "../../../context/userContext";
import { expensesContext } from "../../../context/expensesContext";
import fetchOptions from "../../../utils/fetchOptions";

function ExpensesTransaction({ transactionId, title, amount, type, date }) {
  //write code here
  const { currentUser } = useContext(userContext);
  const { setUserExpenses, userExpenses } = useContext(expensesContext);
  const { performFetch, cancelFetch } = useFetch(
    `/expenses/deleteExpenses/${currentUser._id}/${transactionId}`,
    async (res) => {
      await setUserExpenses(res.result);
      console.log(res.result);
      console.log(userExpenses);
    }
  );

  useEffect(() => {
    return () => cancelFetch();
  }, [userExpenses]);

  function deleteTransaction() {
    performFetch(fetchOptions("DELETE"));
  }
  return (
    <div className="expenses-transaction">
      <div className="expenses-transaction-part1">
        <p className="expenses-transaction-part1-title">{title}</p>
        <p className="expenses-transaction-part1-date">{date}</p>
        <p className="expenses-transaction-part1-amount">{amount} €</p>
      </div>
      <div className="expenses-transaction-part2">
        <i className="fas fa-trash" onClick={deleteTransaction}></i>
      </div>
    </div>
  );
}

ExpensesTransaction.propTypes = {
  transactionId: PropTypes.string,
  title: PropTypes.string,
  amount: PropTypes.number,
  type: PropTypes.string,
  date: PropTypes.string,
};
export default ExpensesTransaction;
