import React from "react";
import PropTypes, { object } from "prop-types";

function FormsButtonsBar({ buttons = [], hideFormsFunc }) {
  // buttons should be objects like this {icon: "fas fa-plus..." , func: showSomeForm}
  //write code here

  return (
    <div className="forms-buttons">
      {buttons.map((button, index) => (
        <div
          className="forms-buttons-icon"
          onClick={button.func}
          key={index}
          title={button.title}
        >
          <i className={button.icon}></i>
        </div>
      ))}
      <div
        className="forms-buttons-icon"
        onClick={hideFormsFunc}
        title="hide forms"
      >
        <i className="fas fa-eye-slash"></i>
      </div>
    </div>
  );
}

FormsButtonsBar.propTypes = {
  buttons: PropTypes.arrayOf(object),
  hideFormsFunc: PropTypes.func,
};
export default FormsButtonsBar;
