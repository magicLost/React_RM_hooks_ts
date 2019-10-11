import React from 'react';
import classes from './MenuItem.module.scss';
import {MenuItem} from "./../../data/menu_data";

/* export const backgroundColorsByLayer = [
    "#ffffff", 
    "#f7f7f7",
    "#e5e5e5",
]; */

export const getBottomTopPaddingByLayer = (layer: number, initPadding: number): number => {

    return initPadding - layer * 3;

};
        
interface MenuItemProps  {
    layer: number,
    initTopBottomPadding: number,
    backgroundColors: string[],
    itemDesc: MenuItem
}

const menuItem = ({layer, initTopBottomPadding, backgroundColors, itemDesc}: MenuItemProps) => {

    //calc padding-top, padding-bottom
    const topBottomPadding = getBottomTopPaddingByLayer(layer, initTopBottomPadding);
    //get background
    const backgroundColor = backgroundColors[layer];

    const style: React.CSSProperties = { 
        backgroundColor: backgroundColor,
        paddingTop: topBottomPadding + "px",
        paddingBottom: topBottomPadding + "px"
     }

    return (
        <a
            className={classes.Link}
            style={style}
            href={itemDesc.href}
        >{itemDesc.title}</a>
    );
};

export default menuItem;
        