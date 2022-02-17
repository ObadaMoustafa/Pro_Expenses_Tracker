import React from "react";
import PropTypes from "prop-types";

function Form({ children, onSubmit, formHeader, formWidth, className }) {
  //write code here

  return (
    <form
      onSubmit={onSubmit}
      style={{ width: formWidth }}
      className={className}
    >
      <h2>{formHeader}</h2>
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
