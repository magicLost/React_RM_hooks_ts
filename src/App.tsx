import React, { useState, useMemo } from 'react';
import classes from './App.module.scss';
import Homepage from './container/Pages/Homepage/Homepage';
import Test from './component/Test/Test';
import Header from './container/Pages/Partial/Header/Header';
import { toolbarItemsArray } from './data/homepage_data';
import MenuTab from './component/MenuTab/MenuTab';
import { mainMenuItems } from "./data/menu_data";
import Modal from './component/Modal/Modal';


function App() {

  console.log("render App");

  const [isShowMenu, setIsShowMenu] = useState(false);

  const onCloseMenu = (event: any) => {
    setIsShowMenu(false);
  }

  return (
    <>

      {/* <Test /> */}
      <Homepage /> 

     {/*  <MobileMenu
        show={isShowMenu}
        items={mainMenuItems}
        closeMenuHandler={onCloseMenu}
      /> */}

   {/*    <button
        onClick={() => {setIsShowMenu(true);}}
      >Show modal</button>

      <div className={classes.Test}></div>

      <Modal
        show={isShowMenu}
        onClose={onCloseMenu}
        type={"LEFT_TAB"}
      >

          <div style={{paddingTop: "25px"}}>
            <MenuTab
                isVisible={true}
                items={mainMenuItems}
                layer={0}
                backgroundColors={[
                    'white',
                    "#f7f7f7",
                    "gray"
                ]}
                initHeight={220}
                initTopBottomPadding={20}
            />
          </div>

      </Modal> */}


      {/* <Homepage /> */}

      {/* <Header
        toolbarItems={toolbarItemsArray}
        toolBarItemClick={(event: any) => {console.log("toolBarItemClick")}}
        activeSectionIndex={0}
        increaseSectionIndex={(event: any) => {console.log("increaseSectionIndex")}}
        decreaseSectionIndex={(event: any) => {console.log("decreaseSectionIndex")}}
        onShowMainMenu={(event: any) => {console.log("onShowMainMenu")}}
        callMeButtonClickHandler={(event: any) => {console.log("callMeButtonClickHandler")}}
      /> */}

      {/* <div className={classes["Section--Center"]}>
        <MenuTab
          isVisible={true}
          items={mainMenuItems}
          layer={0}
          backgroundColors={[
            "#ffffff",
            "#f7f7f7",
            "#e5e5e5",
            "gray"
          ]}
          initHeight={220}
          initTopBottomPadding={20}
        />
      </div> */}

    </>
  );
}

export default App;
