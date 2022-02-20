import React, { useContext, useEffect } from "react";
import ShowAllTransactions from "../../components/show_transactions/ShowAllTransactions";
import { debtsContext } from "../../context/debtsContext";
import { userContext } from "../../context/userContext";
import useFetch from "../../hooks/useFetch";
import LoadingOrError from "../../components/loading&errors/LoadingOrError";

function ShowAllDebts() {
  //write code here
  const { currentUser } = useContext(userContext);
  const { setUserDebts, setDebtsTransactions, setForFilterDebtsTransactions } =
    useContext(debtsContext);
  const { performFetch, isLoading, error, cancelFetch } = useFetch(
    `/debts/getUserDebts/${currentUser._id}`,
    (res) => {
      setUserDebts(res.result);
      setDebtsTransactions(res.allTransactions);
      setForFilterDebtsTransactions(res.allTransactions);
    }
  );

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
      <ShowAllTransactions
        headerTitle="All paid Debts Transactions"
        type="paidDebts"
      />
    </>
  );
}

export default ShowAllDebts;
