import React from "react";
import classes from "./FileInput.module.scss";

import { FormElementProps } from "../FormElementPropsInterface";

interface FileInputProps extends FormElementProps {
  error: string;
}

const fileInput = ({
  elementAttrs,
  value,
  name,
  labelValue,
  error,
  onChange,
  disabled = false
}: FileInputProps) => {
  return (
    <div className={classes.FileInput}>
      <label className={classes.Label} htmlFor={elementAttrs.id}>
        {labelValue}
      </label>

      <input
        className={classes.Input}
        type="file"
        {...elementAttrs}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />

      {error && (
        <div className={classes.Error}>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default fileInput;
