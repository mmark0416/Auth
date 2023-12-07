import React from "react";
import { useNavigation } from "react-router-dom";
import PropTypes from "prop-types";

const SubmitBtn = ({ name, formBtn = false }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <button
      type="submit"
      className={`btn btn-block ${formBtn && "form-btn"} ${
        isSubmitting && "opacity-70"
      }`}
      disabled={isSubmitting}
    >
      {name}
    </button>
  );
};

SubmitBtn.propTypes = {
  name: PropTypes.string,
  formBtn: PropTypes.bool,
};

export default SubmitBtn;
