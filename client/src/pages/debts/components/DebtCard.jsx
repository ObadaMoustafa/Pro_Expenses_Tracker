import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { userContext } from "../../../context/userContext";
import PayDebtTransaction from "./PayDebtTransaction";
import useFetch from "../../../hooks/useFetch";
import { debtsContext } from "../../../context/debtsContext";
import LoadingOrError from "../../../components/loading&errors/LoadingOrError";
import fetchOptions from "../../../utils/fetchOptions";
import EditDebtDetailsForm from "../../../components/forms/EditDebtDetailsForm";
import DebtCardDetails from "./DebtCardDetails";
import DeleteDebtConfirmationForm from "../../../components/forms/DeleteDebtConfirmationForm";

function DebtCard({ debtObject }) {
  //write code here
  const { setUserDebts } = useContext(debtsContext);
  const { currentUser } = useContext(userContext);
  const { currency } = currentUser;
  const { _id, payHistory } = debtObject;
  const [shouldShowEditForm, setShouldShowEditForm] = useState(false);
  const [shouldShowDeleteConfirmation, setShouldShowDeleteConfirmation] =
    useState(false);

  // performing fetch to delete the whole debt card
  const { performFetch, isLoading, error, cancelFetch } = useFetch(
    `/debts/deleteDebt/${currentUser._id}/${_id}`,
    res => {
      setUserDebts(res.result);
    }
  );

  useEffect(() => {
    return () => cancelFetch();
  }, []);

  // show the popup form to edit debt details
  function showEditDebtForm() {
    setShouldShowEditForm(true);
  }

  function deleteDebtCard(e) {
    e.preventDefault();
    performFetch(fetchOptions("DELETE"));
  }

  function ShowDeleteConfirmation() {
    setShouldShowDeleteConfirmation(true);
  }

  return (
    <>
      <LoadingOrError
        isLoading={isLoading}
        isErr={error ? true : false}
        errMsg={error}
      />
      <div className="debt-card">
        <div className="debt-card-header">
          <DebtCardDetails debtObject={debtObject} currency={currency} />
          {/* edit and delete card icons */}
          <div className="debt-card-header-icons">
            <i
              className="fas fa-edit"
              title="Edit Debt"
              onClick={showEditDebtForm}></i>
            <i
              className="fas fa-trash-alt"
              title="Delete Debt"
              onClick={ShowDeleteConfirmation}></i>
          </div>

          {/* all debt transactions */}
        </div>
        {payHistory.map(payTransaction => (
          <PayDebtTransaction
            payDebtTransaction={payTransaction}
            debtId={_id}
            key={payTransaction._id}
          />
        ))}
      </div>
      {shouldShowEditForm && (
        <EditDebtDetailsForm
          setHideForm={setShouldShowEditForm}
          debtObject={debtObject}
        />
      )}
      {shouldShowDeleteConfirmation && (
        <DeleteDebtConfirmationForm
          deleteFunc={deleteDebtCard}
          setHideForm={setShouldShowDeleteConfirmation}
        />
      )}
    </>
  );
}

DebtCard.propTypes = {
  debtObject: PropTypes.object,
};
export default DebtCard;
