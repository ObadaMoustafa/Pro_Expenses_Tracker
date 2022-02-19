import React, { useContext, useEffect, useState } from "react";
import ShowOverView from "./components/ShowOverView";
import { expensesContext } from "../../context/expensesContext";
import { userContext } from "../../context/userContext";
import useFetch from "../../hooks/useFetch";
import LoadingOrError from "../../components/loading&errors/LoadingOrError";
import AddDifferentExpenses from "./components/AddDifferentExpenses";

function ExpensesOverview() {
  //will use new user to show or redirect to add expenses page if there is no records for user
  const { userExpenses, setUserExpenses, updateExpensesArrays } =
    useContext(expensesContext);
  const { currentUser } = useContext(userContext);
  const [isRecord, setIsRecord] = useState(false);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/expenses/getExpenses/${currentUser._id}`,
    (res) => {
      setUserExpenses(res.result);
    }
  );

  // update the arrays and update the isRecord state once userExpenses change.
  useEffect(() => {
    updateExpensesArrays();
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
        <p className="add-expenses-header">
          At least you need to add one expenses to show the overview page
        </p>
      )}
      <AddDifferentExpenses />
    </>
  );
}

ExpensesOverview.propTypes = {};
export default ExpensesOverview;
