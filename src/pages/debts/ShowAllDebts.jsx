import React, { useContext, useEffect, useState } from "react";
import { debtsContext } from "../../context/debtsContext";
import { userContext } from "../../context/userContext";
import useFetch from "../../hooks/useFetch";
import LoadingOrError from "../../components/loading_and_errors/LoadingOrError";
import CreateDebtForm from "../../components/forms/CreateDebtForm";
import PayDebtsForm from "../../components/forms/PayDebtsForm";
import FormsButtonsBar from "../../components/show_transactions/FormsButtonsBar";
import DebtCard from "./components/DebtCard";

function ShowAllDebts() {
  //write code here
  const { currentUser } = useContext(userContext);
  const { userDebts, setUserDebts } = useContext(debtsContext);

  const { performFetch, isLoading, error, cancelFetch } = useFetch(
    `/debts/getUserDebts/${currentUser._id}`,
    (res) => {
      setUserDebts(res.result);
    }
  );

  const [shouldShowCreateDebtForm, setShouldShowCreateDebtForm] =
    useState(false);
  const [shouldShowPayDebtsForm, setShouldShowPayDebtsForm] = useState(false);

  function showِCreateDebtForm() {
    setShouldShowPayDebtsForm(false);
    setShouldShowCreateDebtForm((prev) => !prev);
  }

  function showِPayDebtForm() {
    setShouldShowPayDebtsForm((prev) => !prev);
    setShouldShowCreateDebtForm(false);
  }

  useEffect(() => {
    performFetch();
    return () => cancelFetch();
    // eslint-disable-next-line
  }, []);

  const formBar = [
    {
      icon: "fas fa-plus-circle",
      func: showِPayDebtForm,
      title: "Pay for debt",
    },
    {
      icon: "bi bi-folder-plus",
      func: showِCreateDebtForm,
      title: "Create new debt",
    },
  ];
  return (
    <>
      <FormsButtonsBar buttons={formBar} />
      {/* should put here filtration form for debts */}
      {shouldShowCreateDebtForm && <CreateDebtForm />}
      {shouldShowPayDebtsForm && <PayDebtsForm />}
      <h2 className="section-title">Click on Debt to see it's details</h2>
      {userDebts.length > 0 &&
        userDebts.map((debtObject) => (
          <DebtCard debtObject={debtObject} key={debtObject._id} />
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
