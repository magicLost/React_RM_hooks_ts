import React, { useMemo } from 'react';
import classes from './RCarouselTranslate.module.scss';
import { getListStyle } from './View/RCarouselTranslateView';
import {CarouselAction} from "../../../../hooks/Carousels/RCarousel/rcarousel";

        
interface RCarouselTranslateProps  {

    items: any[];
    getItems: (
        //items: any[],
        itemClass: string, 
        activeIndex: number) => JSX.Element[];
    activeIndex: number;
    translateX: number;
    isTranslated: boolean;
    dispatch: React.Dispatch<CarouselAction>
}

const RCarouselTranslate = ({items, getItems, activeIndex, translateX, isTranslated, dispatch}: RCarouselTranslateProps) => {

    const onMouseDown = (event: any) => {

        event.preventDefault();
        event.stopPropagation();

        window.addEventListener('mousemove', onMouseMove, false);
        window.addEventListener('mouseup', onMouseUp, false);

        dispatch({type: "POINTER_DOWN", pageX: event.pageX, pageY: event.pageY});
    };

    const onMouseMove = (event: any) => {

        event.preventDefault();
        event.stopPropagation();

        dispatch({type: "POINTER_MOVE", pageX: event.pageX, pageY: event.pageY});
    };

    const onMouseUp = (event: any) => {

        event.preventDefault();
        event.stopPropagation();

        window.removeEventListener('mousemove', onMouseMove, false);
        window.removeEventListener('mouseup', onMouseUp, false);

        dispatch({type: "POINTER_UP"});
    };

    const onTouchStart = (event: any) => {

        event.preventDefault();
        event.stopPropagation();

        const touches = event.changedTouches[0];

        dispatch({type: "POINTER_DOWN", pageX: touches.pageX, pageY: touches.pageY});
    };

    const onTouchMove = (event: any) => {

        event.preventDefault();
        event.stopPropagation();

        const touches = event.changedTouches[0];

        dispatch({type: "POINTER_MOVE", pageX: touches.pageX, pageY: touches.pageY});

    };

    const onTouchEnd = (event: any) => {

        event.preventDefault();
        event.stopPropagation();

        dispatch({type: "POINTER_UP"});
    };

    /* RENDER */

    console.log("render RCarouselTranslate");

    const listStyle: React.CSSProperties = getListStyle(activeIndex, translateX, isTranslated);

    return (
        
        <div className={classes.RCarouselTranslate}>

            <ul
                className={classes.ItemsList}
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                style={listStyle}
            >

                { useMemo(() => getItems(classes.Item, activeIndex), [items])  }

            </ul>
            
        </div>
            
    );
};

export default RCarouselTranslate;
        