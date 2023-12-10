import React from "react";
import PropTypes from "prop-types";

const FormRow = ({ type, name, label = name }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input type={type} name={name} className="form-input" />
    </div>
  );
};

FormRow.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
};

export default FormRow;
