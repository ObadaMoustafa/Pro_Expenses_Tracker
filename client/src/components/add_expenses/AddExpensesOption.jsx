import React from "react";
import RoundButton from "../buttons/RoundButton";

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

export default AddExpensesOption;
