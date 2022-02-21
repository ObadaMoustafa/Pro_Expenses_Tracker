import React, { useContext, useEffect, useState } from "react";
import { debtsContext } from "../../context/debtsContext";
import { userContext } from "../../context/userContext";
import useFetch from "../../hooks/useFetch";
import LoadingOrError from "../../components/loading&errors/LoadingOrError";
import FilterByDateForm from "../../components/forms/FilterByDateForm";
import CreateDebtForm from "../../components/forms/CreateDebtForm";
import PayDebtsForm from "../../components/forms/PayDebtsForm";
import FormsButtonsBar from "../../components/show_transactions/FormsButtonsBar";
import ShowPaidDebtTransactions from "../../components/show_transactions/ShowPaidDebtTransactions";

function ShowAllDebts() {
  //write code here
  const { currentUser } = useContext(userContext);
  const {
    userDebts,
    setUserDebts,
    setDebtsTransactions,
    setForFilterDebtsTransactions,
  } = useContext(debtsContext);

  const { performFetch, isLoading, error, cancelFetch } = useFetch(
    `/debts/getUserDebts/${currentUser._id}`,
    (res) => {
      setUserDebts(res.result);
      setDebtsTransactions(res.allTransactions);
      setForFilterDebtsTransactions(res.allTransactions);
    }
  );

  const [shouldShowFilterForm, setShouldShowFilterForm] = useState(false);
  const [shouldShowCreateDebtForm, setShouldShowCreateDebtForm] =
    useState(false);
  const [shouldShowPayDebtsForm, setShouldShowPayDebtsForm] = useState(false);

  function showFilterForm() {
    setShouldShowFilterForm(true);
    setShouldShowPayDebtsForm(false);
    setShouldShowCreateDebtForm(false);
  }

  function showِCreateDebtForm() {
    setShouldShowFilterForm(false);
    setShouldShowPayDebtsForm(false);
    setShouldShowCreateDebtForm(true);
  }

  function showِPayDebtForm() {
    setShouldShowFilterForm(false);
    setShouldShowPayDebtsForm(true);
    setShouldShowCreateDebtForm(false);
  }

  function hideForms() {
    setShouldShowFilterForm(false);
    setShouldShowPayDebtsForm(false);
    setShouldShowCreateDebtForm(false);
  }

  useEffect(() => {
    performFetch();
    return () => cancelFetch();
  }, []);

  const formBar = [
    {
      icon: "fas fa-filter",
      func: showFilterForm,
    },
    {
      icon: "fas fa-plus-circle",
      func: showِPayDebtForm,
    },
    {
      icon: "bi bi-folder-plus",
      func: showِCreateDebtForm,
    },
  ];
  return (
    <>
      <FormsButtonsBar buttons={formBar} hideFormsFunc={hideForms} />
      {/* should put here filtration form for debts */}
      {shouldShowCreateDebtForm && <CreateDebtForm />}
      {shouldShowPayDebtsForm && <PayDebtsForm />}
      <h2 className="section-title">Click on Debt to see it's details</h2>
      {userDebts.length > 0 &&
        userDebts.map((debtObject) => (
          <ShowPaidDebtTransactions
            debtObject={debtObject}
            key={debtObject._id}
          />
        ))}
      <LoadingOrError
        isLoading={isLoading}
        isErr={error ? true : false}
        errMsg={error}
      />
    </>
  );
}

export default ShowAllDebts;