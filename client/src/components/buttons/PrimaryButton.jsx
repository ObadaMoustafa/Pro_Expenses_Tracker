import React from "react";
import propTypes from "prop-types";
import Button, { commonProps } from "./Button";

function PrimaryButton({
  href,
  text,
  width,
  icon,
  onClick,
  disabled,
  ...rest
}) {
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
      {...rest}
    />
  );
}

PrimaryButton.propTypes = {
  ...commonProps,
  disabled: propTypes.bool,
};
export default PrimaryButton;
