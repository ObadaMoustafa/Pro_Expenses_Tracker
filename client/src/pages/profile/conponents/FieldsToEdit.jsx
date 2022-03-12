import React from "react";
import PropTypes from "prop-types";

function FieldsToEdit({
  fieldName,
  fieldValue,
  showEditFormFunc,
  shouldShowForm,
  EditForm,
}) {
  //write code here

  return (
    <div className="user-field">
      <div className="user-field-info">
        <h3>
          {fieldName}: <span>{fieldValue}</span>
        </h3>
        <i
          className="fas fa-edit"
          onClick={showEditFormFunc}
          title={`Edit ${fieldName}`}></i>
      </div>
      <div className="user-field-form">{shouldShowForm && EditForm}</div>
    </div>
  );
}

FieldsToEdit.propTypes = {
  fieldName: PropTypes.string,
  fieldValue: PropTypes.string,
  showEditFormFunc: PropTypes.func,
  shouldShowForm: PropTypes.bool,
  EditForm: PropTypes.element,
};
export default FieldsToEdit;
