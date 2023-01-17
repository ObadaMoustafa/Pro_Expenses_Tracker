import React from "react";
import PropTypes from "prop-types";

function SelectInput({
  isRequired = true,
  label,
  options = [],
  value,
  setValue,
}) {
  return (
    <div className="input-container">
      <label htmlFor="payDebts">
        {label} {isRequired && <span>*</span>}
      </label>
      <select
        name="debts"
        id="debts"
        value={value}
        onChange={e => setValue(e.target.value)}
        className="input-field"
        style={{ color: value === "none" && "lightgray" }}
        required>
        <option value="none" disabled style={{ color: "gray" }}>
          Select the right option
        </option>
        {options.length > 0 &&
          options.map((option, index) => (
            <option
              value={option._id || option}
              key={index}
              style={{ color: "black", padding: "30px 0" }}>
              {option.title || option}
            </option>
          ))}
      </select>
    </div>
  );
}

SelectInput.propTypes = {
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  option: PropTypes.array,
  value: PropTypes.string,
  setValue: PropTypes.func,
};
export default SelectInput;
