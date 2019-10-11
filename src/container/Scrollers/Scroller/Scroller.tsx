import React, {useEffect, useRef, CSSProperties, useMemo} from 'react';
import classes from './Scroller.module.scss';
import { useScroller } from '../../../hooks/Scrollers/Scroller/scroller';
//import {EVENT_TYPE} from "./Model/IdentifyEvent";
        
export type GetItems = (

    itemClass: string, 
    onItemClick: (target: any) => void | undefined, 
    numberOfActiveItems: number,
    itemRef: React.RefObject<HTMLLIElement> | null

) => JSX.Element[];

interface ScrollerProps  {

    items: any[];
    //type: string;
    itemClickHandler?: (target: any) => void | undefined;

    getItems: GetItems;
}

const Scroller = ({items, itemClickHandler, getItems}: ScrollerProps) => {

    const { controller, translateX, isNeedScroller, numberOfActiveItems } = useScroller();

    useEffect(() => {
 
         window.addEventListener('resize', controller.onWindowResize, false);
 
         return () => {
             window.removeEventListener('resize', controller.onWindowResize, false);
         };

    }, []);

    useEffect(() => {

        console.log("controller.containerRef", controller.containerRef);
        console.log("controller.listRef", controller.listRef);
        console.log("controller.itemRef", controller.itemRef);

        controller.numberOfItems = items.length;
        controller.init();

    }, [items]);

    controller.containerRef = useRef(null);
    controller.listRef = useRef(null); 
    controller.itemRef = useRef(null);

    const onItemClick = (event: any) => {

        //console.log("onItemClick ");
        if(itemClickHandler === undefined) throw new Error("Bad itemClickHandler");
        if(controller.itemRef === null) throw new Error("No item ref");

        const target = event.target;
        //console.log("itemClickHandler start", state.eventType, state.isNeedScroller);
    
        if(isNeedScroller){
    
            if(controller.eventType === "CLICK"){
    
                //console.log("itemClickHandler eval", state.eventType);
                itemClickHandler(target);
    
            }
    
        }else{
    
            itemClickHandler(target);
    
        }
    
    };

    console.log("scroller render", controller.itemRef);

    /*RENDER*/

    /* let finalListStyle: CSSProperties = {justifyContent: "center"};
    let mouseDownHandler: ((event: any) => void | undefined) | undefined = undefined;
    let touchStartHandler: ((event: any) => void | undefined) | undefined = undefined;
    let touchMoveHandler: ((event: any) => void | undefined) | undefined = undefined;
    let touchEndHandler: ((event: any) => void | undefined) | undefined = undefined;

    if(isNeedScroller){

        finalListStyle = {
            ...controller.listStyle,
            transform: 'translateX(' + translateX + 'px)'
        };

        mouseDownHandler = controller.onMouseDown;
        touchStartHandler = controller.onTouchStart;
        touchMoveHandler = controller.onTouchMove;
        touchEndHandler = controller.onTouchEnd;

    } */

    let finalListStyle: CSSProperties = {
        ...controller.listStyle,
        transform: 'translateX(' + translateX + 'px)'
    };
    let mouseDownHandler: ((event: any) => void | undefined) | undefined = controller.onMouseDown;
    let touchStartHandler: ((event: any) => void | undefined) | undefined = controller.onTouchStart;
    let touchMoveHandler: ((event: any) => void | undefined) | undefined = controller.onTouchMove;
    let touchEndHandler: ((event: any) => void | undefined) | undefined = controller.onTouchEnd;

    if(!isNeedScroller){

        finalListStyle = {justifyContent: "center"};

        mouseDownHandler = undefined;
        touchStartHandler = undefined;
        touchMoveHandler = undefined;
        touchEndHandler = undefined;

    }

    return (
        
        <div className={classes.Scroller} ref={controller.containerRef}>

            <ul
                ref={controller.listRef}
                className={classes.ItemsList}
                onMouseDown={mouseDownHandler}
                onTouchStart={touchStartHandler}
                onTouchMove={touchMoveHandler}
                onTouchEnd={touchEndHandler}
                style={finalListStyle}
            >

                { useMemo(() => (getItems(
                        classes.Item,
                        onItemClick, 
                        numberOfActiveItems,
                        controller.itemRef)
                    ), [items, isNeedScroller, numberOfActiveItems]) }

            </ul>


        </div>
            
    );
};

export default Scroller;
        