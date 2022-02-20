import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import useFetch from "../../hooks/useFetch";
import { userContext } from "../../context/userContext";
import { expensesContext } from "../../context/expensesContext";
import fetchOptions from "../../utils/fetchOptions";
import { debtsContext } from "../../context/debtsContext";
import LoadingOrError from "../loading&errors/LoadingOrError";

function ExpensesTransaction({ transactionId, title, amount, type, date }) {
  //write code here
  const { currentUser } = useContext(userContext);
  const {
    setUserExpenses,
    userExpenses,
    userDebts,
    setExpensesArray,
    setIncomeArray,
  } = useContext(expensesContext);
  const { setDebtsTransactions, setUserDebts, setForFilterDebtsTransactions } =
    useContext(debtsContext);

  let deleteApiPath;
  if (type === "expenses")
    deleteApiPath = `/expenses/deleteExpenses/${currentUser._id}/${transactionId}`;
  if (type === "income")
    deleteApiPath = `/expenses/deleteIncome/${currentUser._id}/${transactionId}`;
  if (type === "paidDebts")
    deleteApiPath = `/debts/deletePaidDebtsTransaction/${currentUser._id}`;

  const { performFetch, cancelFetch, isLoading, error } = useFetch(
    deleteApiPath,
    async (res) => {
      if (type === "expenses") {
        await setUserExpenses(res.result);
        setExpensesArray((prev) =>
          prev.filter((transaction) => transaction._id !== transactionId)
        );
      } else if (type === "income") {
        await setUserExpenses(res.result);
        setIncomeArray((prev) =>
          prev.filter((transaction) => transaction._id !== transactionId)
        );
      } else if (type === "paidDebts") {
        await setUserDebts(res.result);
        await setDebtsTransactions(res.allTransactions);
        setForFilterDebtsTransactions((prev) =>
          prev.filter((transaction) => transaction._id !== transactionId)
        );
      }
    }
  );

  useEffect(() => {
    return () => cancelFetch();
  }, [userExpenses, userDebts]);

  function deleteTransaction() {
    if (type === "paidDebts") {
      const reqBody = {
        debtTitle: title,
        transactionId,
      };
      performFetch(fetchOptions("DELETE", reqBody));
    } else {
      performFetch(fetchOptions("DELETE"));
    }
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
          <p className="expenses-transaction-part1-amount">{amount} €</p>
        </div>
        <div className="expenses-transaction-part2">
          <i className="fas fa-trash" onClick={deleteTransaction}></i>
        </div>
      </div>
    </>
  );
}

ExpensesTransaction.propTypes = {
  transactionId: PropTypes.string,
  title: PropTypes.string,
  amount: PropTypes.number,
  type: PropTypes.oneOf(["expenses", "income", "paidDebts"]).isRequired,
  date: PropTypes.string,
};
export default ExpensesTransaction;
