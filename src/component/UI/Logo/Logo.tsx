import React from "react";
import classes from "./Logo.module.scss";
import icons from "../../../static/icons/ICONS.svg";
import { Link } from "react-router-dom";

interface LogoProps {
  isHomepage: boolean;
}

const Logo = ({ isHomepage }: LogoProps) => {
  console.log("render Logo");

  if (isHomepage) {
    return (
      <div className={classes.Logo}>
        <svg
          className={classes.Svg}
          width="5"
          height={"5"}
          viewBox={"0 0 836 859.07"}
        >
          <use xlinkHref={icons + "#logo"} />
        </svg>
      </div>
    );
  } else {
    return (
      <Link className={classes.Logo} to={"/"}>
        <svg className={classes.Svg} width="5" height={"5"}>
          <use xlinkHref={icons + "#logo"} />
        </svg>
      </Link>
    );
  }
};

export default Logo;
