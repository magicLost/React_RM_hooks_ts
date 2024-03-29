import React from "react";
import classes from "./Button.module.scss";

export type BUTTON_TYPE = "TEXT" | "OUTLINED" | "CONTAINED";

export interface ButtonProps {
  label: string;
  type: BUTTON_TYPE;
  onClick?: (event: any) => void | undefined;
  disabled?: boolean;
  style?: {};
  index?: number;
  isLoading?: boolean;
}

const button = ({
  label,
  type,
  disabled,
  onClick,
  isLoading = false,
  style = {},
  index = 0
}: ButtonProps) => {
  let buttonClasses: string = classes.Button;

  switch (type) {
    case "TEXT":
      buttonClasses += " " + classes["Button--Text"];
      break;
    case "OUTLINED":
      buttonClasses += " " + classes["Button--Outlined"];
      break;
    case "CONTAINED":
      buttonClasses += " " + classes["Button--Contained"];
      break;

    default:
      console.error("Bad button type " + type);
      buttonClasses += " " + classes["Button--Text"];
      break;
  }

  const btnLabel = isLoading ? "...Подождите" : label;

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      <span data-index={index} className={classes.Label}>
        {btnLabel}
      </span>
    </button>
  );
};

export default button;
