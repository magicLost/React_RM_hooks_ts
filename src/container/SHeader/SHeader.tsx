import React, { useState, useEffect, useMemo } from "react";
import classes from "./SHeader.module.scss";
import Logo from "../../component/UI/Logo/Logo";
import MenuButton from "../../component/UI/MenuButton/MenuButton";
import CallMeButton from "../../component/CallMeButton/CallMeButton";

interface HeaderProps {
  onShowMainMenu: (event: any) => void | undefined;
  callMeButtonClickHandler: (event: any) => void | undefined;
}

const SHeader = ({ onShowMainMenu, callMeButtonClickHandler }: HeaderProps) => {
  const [isShow, setIsShow] = useState(true);
  const [previousY, setPreviousY] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", onWindowScroll, false);

    return () => {
      window.removeEventListener("scroll", onWindowScroll, false);
    };
  });

  const onWindowScroll = (event: any) => {
    const y = (document.body.getBoundingClientRect() as DOMRect).y;

    //console.log("onWindowScroll - ", isShow, previousY);

    if (previousY > y) {
      //console.log("Hide");
      if (isShow === true) {
        setIsShow(false);
      }
    } else {
      //console.log("Show");
      if (isShow === false) {
        setIsShow(true);
      }
    }

    setPreviousY(y);
  };

  const wrapperClasses = isShow
    ? [classes.Wrapper, classes.ShowHeader].join(" ")
    : [classes.Wrapper, classes.HideHeader].join(" ");

  const toolButtonsClass = isShow
    ? [classes.ToolButtons, classes.ShowToolButtons].join(" ")
    : [classes.ToolButtons, classes.HideToolButtons].join(" ");

  console.log("render Header");

  return (
    <header className={classes.Header}>
      <div className={wrapperClasses}>
        <div className={classes.Logo}>
          {useMemo(
            () => (
              <Logo isHomepage={false} />
            ),
            []
          )}
        </div>

        <div className={classes.MainMenuButton}>
          {useMemo(
            () => (
              <MenuButton onClick={onShowMainMenu} />
            ),
            []
          )}
        </div>
      </div>

      <div className={toolButtonsClass}>
        {useMemo(
          () => (
            <CallMeButton clickHandler={callMeButtonClickHandler} />
          ),
          []
        )}
      </div>
    </header>
  );
};

export default SHeader;
