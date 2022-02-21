import React, { useContext, useEffect, useState } from "react";
import ShowAllTransactions from "../../components/show_transactions/ShowAllTransactions";
import { debtsContext } from "../../context/debtsContext";
import { userContext } from "../../context/userContext";
import useFetch from "../../hooks/useFetch";
import LoadingOrError from "../../components/loading&errors/LoadingOrError";
import FilterByDateForm from "../../components/forms/FilterByDateForm";
import CreateDebtForm from "../../components/forms/CreateDebtForm";
import PayDebtsForm from "../../components/forms/PayDebtsForm";
import FormsButtonsBar from "../../components/show_transactions/FormsButtonsBar";

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
      {shouldShowFilterForm && <FilterByDateForm type="paidDebts" />}
      {shouldShowCreateDebtForm && <CreateDebtForm />}
      {shouldShowPayDebtsForm && <PayDebtsForm />}

      <h2 className="section-title">Click on Debt to see it's details</h2>
      <LoadingOrError
        isLoading={isLoading}
        isErr={error ? true : false}
        errMsg={error}
      />
    </>
  );
}

export default ShowAllDebts;
