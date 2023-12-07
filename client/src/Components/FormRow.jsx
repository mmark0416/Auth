import React from "react";
import PropTypes from "prop-types";

const FormRow = ({ type, name }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {name}
      </label>
      <input type={type} name={name} className="form-input" />
    </div>
  );
};

FormRow.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
};

export default FormRow;
