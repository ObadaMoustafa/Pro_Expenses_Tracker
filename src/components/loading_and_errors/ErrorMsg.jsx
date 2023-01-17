import React from "react";
import PropTypes from "prop-types";

function ErrorMsg({ errMsg }) {
  //write code here

  return <p style={{ color: "red" }}>{errMsg}</p>;
}

ErrorMsg.propTypes = { errMsg: PropTypes.string.isRequired };
export default ErrorMsg;
