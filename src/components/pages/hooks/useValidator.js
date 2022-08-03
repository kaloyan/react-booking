// validator hook

import { useEffect } from "react";
import { useState } from "react";

export const useValidator = (formik) => {
  const [errors, setErrors] = useState(formik.errors);

  useEffect(() => {
    setErrors(formik.errors);
  }, [formik.errors]);

  const getError = (element) => {
    const el = errors[element] && formik.touched[element] && (
      <span className="error-message">{errors[element]}</span>
    );

    return el;
  };

  const getClass = (element) => {
    return errors[element] && formik.touched[element] ? "input-error" : "";
  };

  return { getError, getClass };
};
