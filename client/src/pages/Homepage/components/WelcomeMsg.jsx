import React, { useState } from "react";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import SecondaryButton from "../../../components/buttons/SecondaryButton";
import walletImg from "../../../images/wallet.png";
import Login from "./Login";
import SignUp from "./SignUp";

function WelcomeMsg() {
  const [canShowLoginForm, setCanShowLoginForm] = useState(false);
  const [canShowSignUpForm, setCanShowSignUpForm] = useState(false);
  function showLoginForm() {
    setCanShowLoginForm(true);
    setCanShowSignUpForm(false);
  }
  function showSignUpForm() {
    setCanShowLoginForm(false);
    setCanShowSignUpForm(true);
  }

  function hideForms() {
    setCanShowLoginForm(false);
    setCanShowSignUpForm(false);
  }

  return (
    <>
      <div>
        <img
          src={walletImg}
          alt="wallet"
          onClick={hideForms}
          style={{ cursor: "pointer" }}
        />
      </div>
      <h1>Pro Expenses Tracker App</h1>
      {!canShowLoginForm && !canShowSignUpForm && (
        <div className="homepage-buttons">
          <PrimaryButton
            text="Login"
            width="150px"
            icon="fas fa-sign-in-alt"
            onClick={showLoginForm}
          />
          <SecondaryButton text="Docs" width="150px" icon="fas fa-book" />
        </div>
      )}
      {canShowLoginForm && <Login showSignUpForm={showSignUpForm} />}
      {canShowSignUpForm && <SignUp showLoginForm={showLoginForm} />}
    </>
  );
}

export default WelcomeMsg;
