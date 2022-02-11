import React from "react";
import PropTypes from "prop-types";

function SplitFields({ children }) {
  //write code here

  return <div className="form-split-fields">{children}</div>;
}

SplitFields.propTypes = {
  children: PropTypes.array,
};
export default SplitFields;
