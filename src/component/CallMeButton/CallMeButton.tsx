import React from "react";
import classes from "./CallMeButton.module.scss";
import icons from "./../../static/icons/ICONS.svg";

interface CallMeButtonProps {
  clickHandler: (event: any) => void | undefined;
}

const CallMeButton = ({ clickHandler }: CallMeButtonProps) => {
  return (
    <button className={classes.CallMeButton} onClick={clickHandler}>
      <svg className={classes.CallMeButtonSvg} width="50" height={"50"}>
        <use xlinkHref={icons + "#callMe"} />
      </svg>
    </button>
  );
};

export default CallMeButton;
