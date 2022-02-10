import React from "react";
import PropTypes from "prop-types";

function Input({
  isRequired = true,
  placeHolder,
  type = "text",
  name,
  value,
  setValue,
}) {
  //you have to make state for every input in the file you gonna use it

  return (
    <div className="input-container">
      <label htmlFor={name}>
        {name} {isRequired && <span>*</span>}
      </label>
      <input
        placeholder={placeHolder}
        type={type}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required={isRequired}
      />
    </div>
  );
}

Input.propTypes = {
  isRequired: PropTypes.bool,
  placeHolder: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func,
};
export default Input;
