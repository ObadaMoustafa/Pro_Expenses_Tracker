import React from "react";
// import PropTypes from "prop-types";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import SecondaryButton from "../../components/buttons/SecondaryButton";

function Homepage() {
  //write code here

  return (
    <div className="homepage-container">
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
    </div>
  );
}

// Homepage.propTypes = {};
export default Homepage;
