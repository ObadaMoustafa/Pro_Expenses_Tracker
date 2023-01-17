import React, { useContext, useEffect, useState } from "react";
import ShowOverView from "./components/ShowOverView";
import { expensesContext } from "../../context/expensesContext";
import { userContext } from "../../context/userContext";
import useFetch from "../../hooks/useFetch";
import LoadingOrError from "../../components/loading_and_errors/LoadingOrError";
import AddDifferentExpenses from "./components/AddDifferentExpenses";
import { debtsContext } from "../../context/debtsContext";

function ExpensesOverview() {
  //will use new user to show or redirect to add expenses page if there is no records for user
  const { userExpenses, setUserExpenses, updateExpensesArrays } =
    useContext(expensesContext);
  const { setUserDebts } = useContext(debtsContext);
  const { currentUser } = useContext(userContext);
  const [isRecord, setIsRecord] = useState(false);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/expenses/getExpenses/${currentUser._id}`,
    (res) => {
      const { expenses, income, paidDebts, userDebts } = res.result;
      setUserDebts(userDebts);
      setUserExpenses({ expenses, income, paidDebts });
      updateExpensesArrays(expenses, income, paidDebts);
    }
  );

  // update the arrays and update the isRecord state once userExpenses change.
  useEffect(() => {
    const { expenses, income, paidDebts } = userExpenses;
    const isResult =
      expenses.length > 0 || income.length > 0 || paidDebts.length > 0;
    if (isResult) {
      setIsRecord(true);
    } else {
      setIsRecord(false);
    }
  }, [userExpenses]);

  // performing the first fetch for total user history
  useEffect(() => {
    performFetch();
    return () => cancelFetch();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <LoadingOrError
        isLoading={isLoading}
        isErr={error ? true : false}
        errMsg={error}
      />

      {isRecord ? (
        <ShowOverView />
      ) : (
        <p className="no-record-msg">
          Welcome {currentUser.name}! <br />
          <br /> To see your account overview you need to add at least one
          expenses
        </p>
      )}
      <AddDifferentExpenses />
    </>
  );
}

export default ExpensesOverview;
