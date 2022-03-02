import React from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import Form from "./Form";

function DeleteDebtConfirmationForm({ setHideForm, deleteFunc }) {
  //write code here

  function hideForm() {
    setHideForm(false);
  }

  return (
    <div className="popup-form-bg">
      <div className="popup-form">
        <Form formHeader="Confirmation" onSubmit={deleteFunc}>
          <p>
            Are you sure you want to delete whole debt with all transactions ?
          </p>
          <PrimaryButton text="Yes" width="150px" />
          <SecondaryButton text="No" width="150px" onClick={hideForm} />
        </Form>
      </div>
    </div>
  );
}

export default DeleteDebtConfirmationForm;
