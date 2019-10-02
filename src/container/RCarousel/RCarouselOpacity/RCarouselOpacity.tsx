import React, {useMemo} from 'react';
import classes from './RCarouselOpacity.module.scss';
import {CarouselAction} from "./../../../hooks/RCarousel/rcarousel";
        
interface RCarouselOpacityProps  {
    items: any[];
    getItems: (
        itemClass: string, 
        getItemStyle: (index: number) => any, 
        isTranslated: boolean, 
        opacity: number,
        activeIndex: number) => JSX.Element[];
    activeIndex: number;
    opacity: number;
    isTranslated: boolean;
    dispatch: React.Dispatch<CarouselAction>
}

const RCarouselOpacity = ({items, getItems, activeIndex, opacity, isTranslated, dispatch}: RCarouselOpacityProps) => {
    
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

    const getItemStyle = (index: number) => {

        let style = undefined;

        if(activeIndex === index){

            if(isTranslated){

                style = {
                    //transitionProperty: 'opacity',
                    opacity: opacity >= 0.5 ? opacity : 0.5
                }

            }else{

                style = {
                    transitionProperty: 'opacity',
                    transitionDuration: '0.5s',
                    opacity: opacity
                }

            }

        }

        return style;
    };

    console.log("render RCarouselOpacity");

    const itemsElements: JSX.Element[] = getItems(classes.Item, getItemStyle, isTranslated, opacity, activeIndex);
    
    return (
        
        <div className={classes.RCarouselOpacity}>

            <ul
                className={classes.ItemsList}
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >

                { itemsElements }
{/*                 { useMemo(() => getItems(classes.Item, getItemStyle, isTranslated, opacity, activeIndex), [activeIndex, items, opacity, isTranslated]) }
 */}
            </ul>

        </div>
            
    );
};

export default RCarouselOpacity;
        