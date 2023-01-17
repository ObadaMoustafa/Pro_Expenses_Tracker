import React from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import Form from "./Form";
import propTypes from "prop-types";

function DeleteConfirmationForm({ setHideForm, deleteFunc, msg }) {
  //write code here

  function hideForm() {
    setHideForm(false);
  }

  return (
    <div className="popup-form-bg">
      <div className="popup-form">
        <Form formHeader="Confirmation" onSubmit={deleteFunc}>
          <p>{msg}</p>
          <div className="delete-msg-buttons">
            <PrimaryButton text="Yes" width="150px" />
            <SecondaryButton text="No" width="150px" onClick={hideForm} />
          </div>
        </Form>
      </div>
    </div>
  );
}
DeleteConfirmationForm.propTypes = {
  setHideForm: propTypes.func.isRequired,
  deleteFunc: propTypes.func.isRequired,
  msg: propTypes.string.isRequired,
};
export default DeleteConfirmationForm;
