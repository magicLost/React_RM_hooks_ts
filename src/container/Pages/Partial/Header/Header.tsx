import React, {useState, useEffect, useMemo} from 'react';
import classes from './Header.module.scss';
import {CFItem} from "./../../../../data/types";
import Logo from '../../../../component/UI/Logo/Logo';
import ControlsFeature from '../../../ControlsFeature/ControlsFeature';
import ToolButtons from '../../../../component/ToolButtons/ToolButtons';
import MenuButton from '../../../../component/UI/MenuButton/MenuButton';

        
interface HeaderProps  {
    toolbarItems: CFItem[],
    toolBarItemClick: (event: any) => void | undefined, 
    onShowMainMenu: (event: any) => void | undefined, 
    activeSectionIndex: number,
    increaseSectionIndex: (event: any) => void | undefined, 
    decreaseSectionIndex: (event: any) => void | undefined,
    callMeButtonClickHandler: (event: any) => void | undefined 
}

const Header = ({toolbarItems,
    toolBarItemClick,
    onShowMainMenu,
    activeSectionIndex,
    increaseSectionIndex,
    decreaseSectionIndex,
    callMeButtonClickHandler
}: HeaderProps) => {

    const [ isShow, setIsShow ] = useState(true);
    const [ previousY, setPreviousY ] = useState(0);

    useEffect(() => {
        window.addEventListener('scroll', onWindowScroll, false);

        return () => { window.removeEventListener('scroll', onWindowScroll, false); };
    });

    const onWindowScroll = (event: any) => {

        const y = (document.body.getBoundingClientRect() as DOMRect).y;

        //console.log("onWindowScroll - ", isShow, previousY);

        if(previousY > y){

            //console.log("Hide");
            if(isShow === true){
                setIsShow(false);
            }

        }else{

            //console.log("Show");
            if(isShow === false){
                setIsShow(true);
            }

        }

        setPreviousY(y);

    };

    const wrapperClasses = isShow ?
        [classes.Wrapper, classes.ShowHeader].join(' ') : [classes.Wrapper, classes.HideHeader].join(' ');

    const toolButtonsClass = isShow ?
        [ classes.ToolButtons, classes.ShowToolButtons].join(' ') : [ classes.ToolButtons, classes.HideToolButtons ].join(' ');

    console.log("render Header");

    return (
        
        <div className={classes.Header}>

            <div className={wrapperClasses}>

                <div className={classes.Logo}>

                    { useMemo(() => (
                        <Logo
                            isHomepage={true}
                        />
                    ), [])}

                </div>

                <div className={classes.Toolbar}>

                    {
                        useMemo(() => (
                            <ControlsFeature
                                itemClickHandler={toolBarItemClick}
                                items={toolbarItems}
                                config={{
                                    type: "TEXT",
                                    formType: "BOTTOM_HALF_CIRCLE",
                                    isShowTitle: false,
                                    isMainItemText: false,
                                    mainDivStyle: { top: 0 },
                                    mainItemStyle: { backgroundColor: "white" }
                                }}
                            />
                        ), [])
                    }

                </div>

                <div className={classes.MainMenuButton}>

                    <MenuButton
                        onClick={onShowMainMenu}
                    />

                </div>

            </div>

            <div className={toolButtonsClass}>

                {useMemo(() => (
                    <ToolButtons
                        callMeButtonClickHandler={callMeButtonClickHandler}
                        activeSectionIndex={activeSectionIndex}
                        sectionsLength={toolbarItems.length}
                        increaseSectionIndex={increaseSectionIndex}
                        decreaseSectionIndex={decreaseSectionIndex}
                    />
                ), [])}

            </div>

        </div>
            
    );
};

export default Header;
        