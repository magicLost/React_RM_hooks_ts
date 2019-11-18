import React, { useMemo, CSSProperties } from 'react';
import classes from './RCarouselTranslate.module.scss';
import { IRCarouselController } from '../RCarouselController';

        
interface RCarouselTranslateProps  {

    items: any[];
    getItems: (
        //items: any[],
        itemClass: string, 
        activeIndex: number) => JSX.Element[],
    activeIndex: number,
    translateX: number,
    isTranslated: boolean,
    controller: IRCarouselController
}

const RCarouselTranslate = ({items, getItems, activeIndex, translateX, isTranslated, controller}: RCarouselTranslateProps) => {

    const getListStyle = (activeIndex: number, translateX: number, isTranslated: boolean) => {

        const listStyle: CSSProperties = {
            transform: 'translateX(' + stringifyTranslateX(activeIndex, translateX) + ')'
        };
    
        if(!isTranslated){
    
            listStyle.transitionProperty = 'transform';
            listStyle.transitionDuration = '0.3s';
        }
    
        return listStyle;
    };
    
    const stringifyTranslateX = (activeIndex: number, translateX: number) => {
    
        const translateByActiveIndex = - activeIndex * 100 + '%';
    
        return  'calc(' + translateByActiveIndex + " + " + translateX + 'px)';
    
    };

    /* RENDER */

    console.log("render RCarouselTranslate");

    const listStyle: React.CSSProperties = getListStyle(activeIndex, translateX, isTranslated);

    return (
        
        <div className={classes.RCarouselTranslate}>

            <ul
                className={classes.ItemsList}
                onMouseDown={controller.onMouseDown}
                onTouchStart={controller.onTouchStart}
                onTouchMove={controller.onTouchMove}
                onTouchEnd={controller.onTouchEnd}
                style={listStyle}
            >

                { useMemo(() => getItems(classes.Item, activeIndex), [items])  }

            </ul>
            
        </div>
            
    );
};

export default RCarouselTranslate;
        