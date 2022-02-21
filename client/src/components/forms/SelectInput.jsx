import React from "react";
import PropTypes from "prop-types";

function SelectInput({ label, options = [], value, setValue }) {
  return (
    <div className="input-container">
      <label htmlFor="payDebts">{label}</label>
      <select
        name="debts"
        id="debts"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="input-field"
        style={{ color: value === "none" && "lightgray" }}
      >
        <option value="none" disabled style={{ color: "gray" }}>
          Select the right option
        </option>
        {options.length > 0 &&
          options.map((option) => (
            <option
              value={option._id}
              key={option._id}
              style={{ color: "black", padding: "30px 0" }}
            >
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
