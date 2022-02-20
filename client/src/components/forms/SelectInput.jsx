import React from "react";
import PropTypes from "prop-types";

function SelectInput({
  isRequired = true,
  label,
  options = [],
  value,
  setValue,
}) {
  //write code here

  return (
    <div className="input-container">
      <label htmlFor="payDebts">
        {label} {isRequired && <span>*</span>}
      </label>
      <select
        name="debts"
        id="debts"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
        className="input-field"
      >
        <option value="none" disabled>
          Select the right option
        </option>
        {options.length > 0 &&
          options.map((option) => (
            <option value={option._id} key={option._id}>
              {option.title}
            </option>
          ))}
      </select>
    </div>
  );
}

SelectInput.propTypes = {
  label: PropTypes.string,
  option: PropTypes.array,
  value: PropTypes.string,
  setValue: PropTypes.func,
};
export default SelectInput;
