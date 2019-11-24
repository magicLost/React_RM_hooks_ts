import React, { useEffect, useMemo } from "react";
import classes from "./Homepage.module.scss";
import commonClasses from "../../../commonClasses.module.scss";
//import HomepageController from './Controller/HomepageController';
//import ThreeSectionsPageClasses from './Model/ThreeSectionsPageClasses';
import { usePage } from "../../../hooks/Page/page";
import Modal from "../../../component/Modal/Modal";
import Feedback from "../../Forms/Feedback/Feedback";
import MainContent from "./Content/MainContent/MainContent";
import PortfolioContent from "./Content/PortfolioContent/PortfolioContent";
import Contacts from "../Partial/Contacts/Contacts";
//import HomepageController from './Controller/HomepageController';
import { IThreeSectionClasses } from "./../types";
import Header from "../Partial/Header/Header";
import { toolbarItemsArray } from "../../../data/homepage_data";
import { mainMenuItems } from "../../../data/menu_data";

import MenuTab from "../../../component/MenuTab/MenuTab";
//import ControlsFeature from '../../ControlsFeature/ControlsFeature';
//import {toolbarItemsArray, mainPresentationItemsControls} from './../../../data/homepage_data';

const Homepage = () => {
  const {
    controller,
    activeSectionIndex,
    isShowModalFromLeft,
    isShowModalFromTop,
    sectionsClasses,
    createdSections,
    modalChildrenType,
    hiddenFields
  } = usePage("HOMEPAGE", classes, commonClasses, 3);

  console.log("render homepage", activeSectionIndex);

  return (
    <>
      <Header
        toolbarItems={toolbarItemsArray}
        toolBarItemClick={controller.onSetIndex}
        activeSectionIndex={activeSectionIndex}
        increaseSectionIndex={controller.onIncreaseIndex}
        decreaseSectionIndex={controller.onDecreaseIndex}
        onShowMainMenu={controller.onShowMenu}
        callMeButtonClickHandler={controller.onShowCallMeForm}
      />

      <main>
        {createdSections[1] && (
          <section
            className={sectionsClasses.mainSectionClasses}
            style={activeSectionIndex !== 1 ? { display: "none" } : undefined}
          >
            <MainContent />
          </section>
        )}

        {createdSections[0] && (
          <section
            className={
              (sectionsClasses as IThreeSectionClasses).leftSectionClasses
            }
            style={activeSectionIndex !== 0 ? { display: "none" } : undefined}
          >
            <PortfolioContent
              showFeedBackFormHandler={controller.onShowWannaTheSameForm}
            />
          </section>
        )}
      </main>

      <footer>
        {createdSections[2] && (
          <div
            className={sectionsClasses.contactsSectionClasses}
            style={activeSectionIndex !== 2 ? { display: "none" } : undefined}
          >
            <Contacts />
          </div>
        )}
      </footer>

      <Modal
        show={isShowModalFromTop}
        onClose={controller.onHideModal}
        type={"CENTER"}
      >
        {useMemo(() => {
          if (
            modalChildrenType === "FEEDBACK" ||
            modalChildrenType === "WANNA_THE_SAME"
          ) {
            return (
              <Feedback
                url={"http://public.local/feedback"}
                hiddenFields={hiddenFields}
                isCallMe={false}
              />
            );
          } else if (modalChildrenType === "CALL_ME") {
            return (
              <Feedback
                url={"http://public.local/feedback"}
                hiddenFields={hiddenFields}
                isCallMe={true}
              />
            );
          }
        }, [isShowModalFromTop, modalChildrenType])}
      </Modal>

      <Modal
        show={isShowModalFromLeft}
        onClose={controller.onHideModal}
        type={"LEFT_TAB"}
      >
        {useMemo(() => {
          if (modalChildrenType === "MENU") {
            return (
              <MenuTab
                isVisible={true}
                items={mainMenuItems}
                layer={0}
                backgroundColors={["white", "#f7f7f7", "gray"]}
                initHeight={220}
                initTopBottomPadding={20}
              />
            );
          }
        }, [isShowModalFromLeft, modalChildrenType])}
      </Modal>
    </>
  );
};

export default Homepage;
