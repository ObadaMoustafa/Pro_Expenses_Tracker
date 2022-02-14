import React from "react";
import PropTypes from "prop-types";
import PrimaryButton from "../buttons/PrimaryButton";

function Form({ children, onSubmit, formWidth, className }) {
  //write code here

  return (
    <form
      onSubmit={onSubmit}
      style={{ width: formWidth }}
      className={className}
    >
      {children}
    </form>
  );
}

Form.propTypes = {
  // children: PropTypes.array,
  onSubmit: PropTypes.func,
  text: PropTypes.string,
  width: PropTypes.string,
};
export default Form;
