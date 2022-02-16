import React, { useContext, useEffect } from "react";
import ShowOverView from "./components/ShowOverView";
import { expensesContext } from "../../context/expensesContext";
import { userContext } from "../../context/userContext";
import useFetch from "../../hooks/useFetch";
import LoadingOrError from "../../components/loading&errors/LoadingOrError";
import AddDifferentExpenses from "./components/AddDifferentExpenses";

function ExpensesOverview() {
  //will use new user to show or redirect to add expenses page if there is no records for user
  const { userExpenses, setUserExpenses } = useContext(expensesContext);
  const { currentUser } = useContext(userContext);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/expenses/getExpenses/${currentUser._id}`,
    (res) => {
      const { expenses, income, debts } = res.result;
      if (expenses || income || debts) {
        setUserExpenses(res.result);
      } else {
        setUserExpenses(null);
      }
    }
  );
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

      {userExpenses ? (
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
