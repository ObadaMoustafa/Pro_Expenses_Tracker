import React from "react";
import PropTypes from "prop-types";

function Input({
  label,
  isRequired = true,
  type = "text",
  name,
  value,
  setValue,
  width,
  ...rest
}) {
  //you have to make state for every input in the file you gonna use it
  const isOptional = type === "radio" || type === "checkbox";
  return (
    <div className={`input-container ${isOptional && "input-radio-container"}`}>
      <label htmlFor={isOptional ? label : name}>
        {label} {isRequired && <span>*</span>}
      </label>
      <input
        className={isOptional ? "" : "input-field"}
        type={type}
        name={name}
        id={isOptional ? label : ""}
        value={value}
        onChange={e => setValue(e.target.value)}
        required={isRequired}
        {...rest}
      />
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func,
  width: PropTypes.string,
};
export default Input;
