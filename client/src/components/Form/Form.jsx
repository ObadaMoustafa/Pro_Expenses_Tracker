import React from "react";
import PropTypes from "prop-types";
import PrimaryButton from "../buttons/PrimaryButton";

function Form({ children, onSubmit, text, width }) {
  //write code here

  return (
    <form onSubmit={onSubmit}>
      {children}
      <PrimaryButton text={text} width={width} />
    </form>
  );
}

Form.propTypes = {
  children: PropTypes.array,
  onSubmit: PropTypes.func,
  text: PropTypes.string,
  width: PropTypes.string,
};
export default Form;