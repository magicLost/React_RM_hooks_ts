import React from "react";
import classes from "./Checkbox.module.scss";
import { FormElementProps } from "../FormElementPropsInterface";

interface CheckboxProps extends FormElementProps {
  checked: boolean;
}

const Checkbox = ({
  elementAttrs,
  labelValue,
  name,
  value,
  onChange,
  checked,
  disabled = false
}: CheckboxProps) => {
  console.log("Checkbox render ");

  return (
    <div className={classes.Wrapper}>
      <input
        type="checkbox"
        className={classes.Checkbox}
        {...elementAttrs}
        value={value}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        name={name}
      />
      <label htmlFor={elementAttrs.id} className={classes.Label}>
        {labelValue}
      </label>
    </div>
  );
};

export default Checkbox;
