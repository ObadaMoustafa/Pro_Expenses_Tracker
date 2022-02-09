import React from "react";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import SecondaryButton from "../../../components/buttons/SecondaryButton";

function WelcomeMsg() {
  //write code here

  return (
    <>
      <h1>Pro Expenses Tracker App</h1>
      <div className="homepage-buttons">
        <PrimaryButton
          text="Login"
          width="150px"
          icon="fas fa-sign-in-alt"
          href="/login"
        />
        <SecondaryButton text="Docs" width="150px" icon="fas fa-book" />
      </div>
    </>
  );
}

export default WelcomeMsg;
