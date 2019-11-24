import React from "react";

import classes from "./Input.module.scss";
import { FormElementProps } from "../FormElementPropsInterface";

interface InputProps extends FormElementProps {
  error: string;
}

const Input = ({
  elementAttrs,
  value,
  labelValue,
  error,
  name,
  onChange,
  disabled = false
}: InputProps) => {
  let inputClass = classes.Input;
  let errorElement = null;

  if (error) {
    inputClass += " " + classes["Input--Error"];
    errorElement = (
      <div className={classes.Error}>
        <p>{error}</p>
      </div>
    );
  }

  console.log("REnder input", name);

  return (
    <div className={classes.InputWrapper}>
      <label htmlFor={elementAttrs.id} className={classes.Label}>
        {labelValue}
      </label>

      <input
        className={inputClass}
        {...elementAttrs}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />

      {errorElement}
    </div>
  );
};

export default React.memo(Input);
