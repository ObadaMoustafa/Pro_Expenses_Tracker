import React, { useContext, useEffect, useState } from "react";
import EditCurrencyForm from "../../components/forms/EditCurrencyForm";
import EditEmailForm from "../../components/forms/EditEmailForm";
import EditNameForm from "../../components/forms/EditNameForm";
import { userContext } from "../../context/userContext";
import FieldsToEdit from "./conponents/FieldsToEdit";

function Profile() {
  //write code here
  const { currentUser } = useContext(userContext);
  const { name, email, currency } = currentUser;

  // SHOW FORMS STATES
  const [shouldShowEditNameForm, setShouldShowEditNameForm] = useState(false);
  const [shouldShowEditEmailForm, setShouldShowEditEmailForm] = useState(false);
  const [shouldShowEditCurrencyForm, setShouldShowEditCurrencyForm] =
    useState(false);

  // show forms functions
  // give an event listener to window to hide the forms when click outside the form
  useEffect(() => {
    if (
      shouldShowEditNameForm ||
      shouldShowEditEmailForm ||
      shouldShowEditCurrencyForm
    )
      window.addEventListener("click", hideForms);
    return () => window.removeEventListener("click", hideForms);
  }, [
    shouldShowEditNameForm,
    shouldShowEditEmailForm,
    shouldShowEditCurrencyForm,
  ]);

  function hideForms() {
    setShouldShowEditNameForm(false);
    setShouldShowEditEmailForm(false);
    setShouldShowEditCurrencyForm(false);
    console.log("window clicked");
  }

  function showEditNameForm(e) {
    e.stopPropagation();
    setShouldShowEditNameForm(prev => !prev);
    setShouldShowEditEmailForm(false);
    setShouldShowEditCurrencyForm(false);
  }

  function showEditEmailForm(e) {
    e.stopPropagation();
    setShouldShowEditNameForm(false);
    setShouldShowEditEmailForm(prev => !prev);
    setShouldShowEditCurrencyForm(false);
  }

  function showEditCurrencyForm(e) {
    e.stopPropagation();
    setShouldShowEditNameForm(false);
    setShouldShowEditEmailForm(false);
    setShouldShowEditCurrencyForm(prev => !prev);
  }

  return (
    <>
      <h2>Personal info</h2>
      <div className="user-field-container">
        <FieldsToEdit
          fieldName="Name"
          fieldValue={name}
          showEditFormFunc={showEditNameForm}
          shouldShowForm={shouldShowEditNameForm}
          EditForm={
            <EditNameForm setShouldShowFormFn={setShouldShowEditNameForm} />
          }
        />
        <FieldsToEdit
          fieldName="Email"
          fieldValue={email}
          showEditFormFunc={showEditEmailForm}
          shouldShowForm={shouldShowEditEmailForm}
          EditForm={
            <EditEmailForm setShouldShowFormFn={setShouldShowEditEmailForm} />
          }
        />
        <FieldsToEdit
          fieldName="Currency"
          fieldValue={currency}
          showEditFormFunc={showEditCurrencyForm}
          shouldShowForm={shouldShowEditCurrencyForm}
          EditForm={
            <EditCurrencyForm
              setShouldShowFormFn={setShouldShowEditCurrencyForm}
            />
          }
        />
      </div>
    </>
  );
}

export default Profile;
