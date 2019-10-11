import React, { useMemo } from 'react';
import classes from './MenuTab.module.scss';
import {MenuItem as IMenuItem} from "./../../data/menu_data";
import MenuItem from '../MenuItem/MenuItem';
import MenuItemWithChildren from '../MenuItem/MenuItemWithChildren';

interface MenuTabProps  {
    isVisible: boolean,
    layer: number,
    items: IMenuItem[],
    initTopBottomPadding: number,
    initHeight: number, //220
    backgroundColors: string[],
}

export const backgroundColorsByLayer = [
    "white",
    "#ffffff", 
    "#f7f7f7",
    "gray",
];

export const calcHeightByLayer = (layer: number, initHeight: number): number => initHeight - layer * 20;


const MenuTab = ({isVisible, layer, items, initTopBottomPadding, initHeight, backgroundColors}: MenuTabProps) => {

    //get wrapper height, init = 220
    const style: React.CSSProperties = layer === 0 ? {} : { height: calcHeightByLayer(layer, initHeight) + "px"};

    if(isVisible === false)
        style.height = 0;

    const getItemsElements = () => {

        return items.map((item, index) => {

            if(item.items === undefined){
                return (
                    <React.Fragment key={classes.MenuTab + "_" + layer + "_" + index}>
                        <MenuItem
                            layer={layer}
                            initTopBottomPadding={initTopBottomPadding}
                            backgroundColors={backgroundColors}
                            itemDesc={item}
                        />
                    </React.Fragment>
                );
            }else{
                return (
                    <React.Fragment key={classes.MenuTab + "_" + layer + "_" + index}>
                        <MenuItemWithChildren
                            layer={layer}
                            initTopBottomPadding={initTopBottomPadding}
                            backgroundColors={backgroundColors}
                            itemDesc={item}
                            initHeight={initHeight}
                        />
                    </React.Fragment>
                );
            }
    
        });

    };

    console.log("render MenuTab");

    return (
        
        <div className={classes.MenuTab} style={style}>

            {useMemo(getItemsElements, [items])}

        </div>
            
    );
};

export default MenuTab;
        