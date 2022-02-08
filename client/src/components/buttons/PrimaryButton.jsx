import React from "react";
import propTypes from "prop-types";
import Button, { commonProps } from "./Button";

function PrimaryButton({ href, text, width, icon, onClick, disabled }) {
  return (
    <Button
      href={href}
      text={text}
      width={width}
      icon={icon}
      onClick={onClick}
      type="submit"
      className="primary-button"
      disabled={disabled}
    />
  );
}

PrimaryButton.propTypes = {
  ...commonProps,
  disabled: propTypes.bool,
  testID: propTypes.string,
};
export default PrimaryButton;
