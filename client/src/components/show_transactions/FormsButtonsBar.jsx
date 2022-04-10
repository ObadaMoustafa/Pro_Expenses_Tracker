import React from "react";
import PropTypes, { object } from "prop-types";

function FormsButtonsBar({ buttons = [] }) {
  // buttons should be objects with keys like this {icon: "fas fa-plus..." , func: showForm}
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
    </div>
  );
}

FormsButtonsBar.propTypes = {
  buttons: PropTypes.arrayOf(object),
};
export default FormsButtonsBar;
