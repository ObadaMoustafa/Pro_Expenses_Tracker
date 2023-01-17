import React from "react";
import RoundButton from "../buttons/RoundButton";
import PropTypes from "prop-types";

function AddExpensesOption({ header, onClick, buttonText }) {
  //write code here

  return (
    <>
      <div className="add-expenses-button">
        <p className="add-expenses-button-header">{header}</p>
        <div className="add-expenses-button-button">
          <RoundButton text={buttonText} onClick={onClick} />
        </div>
      </div>
    </>
  );
}

AddExpensesOption.propTypes = {
  header: PropTypes.string,
  onClick: PropTypes.func,
  buttonText: PropTypes.string,
};
export default AddExpensesOption;
