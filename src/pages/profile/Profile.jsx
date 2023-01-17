import React, { useContext, useEffect, useState } from "react";
import EditCurrencyForm from "../../components/forms/EditCurrencyForm";
import EditEmailForm from "../../components/forms/EditEmailForm";
import EditNameForm from "../../components/forms/EditNameForm";
import EditPasswordForm from "../../components/forms/EditPasswordForm";
import { userContext } from "../../context/userContext";
import FieldsToEdit from "./components/FieldsToEdit";

function Profile() {
  //write code here
  const { currentUser } = useContext(userContext);
  const { name, email, currency } = currentUser;

  // SHOW FORMS STATES
  const [shouldShowEditNameForm, setShouldShowEditNameForm] = useState(false);
  const [shouldShowEditEmailForm, setShouldShowEditEmailForm] = useState(false);
  const [shouldShowEditCurrencyForm, setShouldShowEditCurrencyForm] =
    useState(false);
  const [shouldShowEditPasswordForm, setShouldShowEditPasswordForm] =
    useState(false);

  // show forms functions
  // give an event listener to window to hide the forms when click outside the form
  useEffect(() => {
    if (
      shouldShowEditNameForm ||
      shouldShowEditEmailForm ||
      shouldShowEditCurrencyForm ||
      shouldShowEditPasswordForm
    )
      window.addEventListener("click", hideForms);
    return () => window.removeEventListener("click", hideForms);
  }, [
    shouldShowEditNameForm,
    shouldShowEditEmailForm,
    shouldShowEditCurrencyForm,
    shouldShowEditPasswordForm,
  ]);

  function hideForms() {
    setShouldShowEditNameForm(false);
    setShouldShowEditEmailForm(false);
    setShouldShowEditCurrencyForm(false);
    setShouldShowEditPasswordForm(false);
  }

  function showEditNameForm(e) {
    e.stopPropagation();
    setShouldShowEditNameForm(prev => !prev);
    setShouldShowEditEmailForm(false);
    setShouldShowEditCurrencyForm(false);
    setShouldShowEditPasswordForm(false);
  }

  function showEditEmailForm(e) {
    e.stopPropagation();
    setShouldShowEditNameForm(false);
    setShouldShowEditEmailForm(prev => !prev);
    setShouldShowEditCurrencyForm(false);
    setShouldShowEditPasswordForm(false);
  }

  function showEditCurrencyForm(e) {
    e.stopPropagation();
    setShouldShowEditNameForm(false);
    setShouldShowEditEmailForm(false);
    setShouldShowEditCurrencyForm(prev => !prev);
    setShouldShowEditPasswordForm(false);
  }

  function showEditPasswordForm(e) {
    e.stopPropagation();
    setShouldShowEditNameForm(false);
    setShouldShowEditEmailForm(false);
    setShouldShowEditCurrencyForm(false);
    setShouldShowEditPasswordForm(prev => !prev);
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
        <FieldsToEdit
          fieldName="Password"
          fieldValue="#####"
          showEditFormFunc={showEditPasswordForm}
          shouldShowForm={shouldShowEditPasswordForm}
          EditForm={
            <EditPasswordForm
              setShouldShowFormFn={setShouldShowEditPasswordForm}
            />
          }
        />
      </div>
    </>
  );
}

export default Profile;
