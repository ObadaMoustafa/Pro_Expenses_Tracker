import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

function RoundButton({ text, width, icon, onClick }) {
  //write code here

  return (
    <Button
      text={text}
      width={width}
      icon={icon}
      onClick={onClick}
      type="submit"
      className="primary-button round-button"
    />
  );
}

RoundButton.propTypes = {
  text: PropTypes.string,
  width: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
};
export default RoundButton;
