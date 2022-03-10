import React, { useContext, useEffect, useState } from "react";
import EditCurrencyForm from "../../components/forms/EditCurrencyForm";
import EditEmailForm from "../../components/forms/EditEmailForm";
import EditNameForm from "../../components/forms/EditNameForm";
import { userContext } from "../../context/userContext";

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
      <div className="userField">
        <h3>
          Name: <span>{name}</span>
        </h3>
        <i className="fas fa-edit" onClick={showEditNameForm}></i>
        {shouldShowEditNameForm && <EditNameForm />}
      </div>
      <div className="userField">
        <h3>
          Email: <span>{email}</span>
        </h3>
        <i className="fas fa-edit" onClick={showEditEmailForm}></i>
        {shouldShowEditEmailForm && <EditEmailForm />}
      </div>
      <div className="userField">
        <h3>
          Currency symbol: <span>{currency}</span>
        </h3>
        <i className="fas fa-edit" onClick={showEditCurrencyForm}></i>
        {shouldShowEditCurrencyForm && <EditCurrencyForm />}
      </div>
    </>
  );
}

export default Profile;
