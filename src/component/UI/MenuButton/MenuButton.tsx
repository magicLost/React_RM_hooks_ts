import React from 'react';
import classes from './MenuButton.module.scss';
import icons from "./../../../static/icons/ICONS.svg";
        
interface MenuButtonProps  {
    onClick: (event: any) => void | undefined;
}

const menuButton = ({onClick}: MenuButtonProps) => {

    console.log("render MenuButton");

    return (
        
        <button className={classes.MenuButton} onClick={onClick}>

            <svg
                className={classes.Svg}
                width="5"
                height={"5"}
                viewBox={"0 0 384 384"}
            >
                <use  xlinkHref={ icons + "#main_menu" }/>
            </svg>

        </button>
            
    );
};

export default menuButton;
        