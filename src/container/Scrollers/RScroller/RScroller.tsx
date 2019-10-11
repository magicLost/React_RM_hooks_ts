import React, { useEffect, useMemo } from 'react';
import classes from './RScroller.module.scss';
import {useScroller} from "./../../../hooks/Scrollers/RScroller/rscroller";
//import {EVENT_TYPE} from "./../../../helper/IdentityEvent/IdentityEvent";
        
export type GetScrollerItems = (
    itemClass: string, 
    onItemClick: (target: any) => void | undefined, 
    numberOfActiveItems: number,
    itemRef: React.RefObject<HTMLLIElement> | null
) => JSX.Element[];

interface RScrollerProps  {
    items: any[],
    itemClickHandler: (event: any) => void | undefined,
    getItems: GetScrollerItems,
   /*  translateX: number, 
    isNeedScroller: boolean, 
    numberOfActiveItems: number,
    eventType: EVENT_TYPE;
    containerRef: React.RefObject<HTMLDivElement> | null,
    listRef: React.RefObject<HTMLUListElement> | null,
    listStyle: React.CSSProperties,
    dispatch: React.Dispatch<ScrollerAction> */
}

const RScroller = ({
    items,
    itemClickHandler, 
    getItems, 
    //translateX, 
    //isNeedScroller, 
    //listStyle, 
    //numberOfActiveItems,
    //eventType, 
    //listRef, 
    //containerRef, 
    //dispatch
}: RScrollerProps) => {

    const {
        translateX, isNeedScroller, numberOfActiveItems, listStyle, 
        eventType, itemRef, listRef, containerRef, scrollerData, dispatch} = useScroller(items);

    useEffect(() => {

        window.addEventListener('resize', onWindowResize, false);

        return () => {
            window.removeEventListener('resize', onWindowResize, false);
        };

    }, []);

    /* LISTENERS */
    const onWindowResize = (event: any) => {

        event.preventDefault();
        event.stopPropagation();

        dispatch({type: "WINDOW_RESIZE"});

    };

    const onMouseDown = (event: any) => {

        //console.log('onMouseDown');
        event.preventDefault();
        event.stopPropagation();

        dispatch({type: "POINTER_DOWN", pageX: event.pageX, pageY: event.pageY});

        window.addEventListener('mousemove', onMouseMove, false);
        window.addEventListener('mouseup', onMouseUp, false);

    };

    const onMouseMove = (event: any) => {

        //console.log('onMouseDown');
        event.preventDefault();
        event.stopPropagation();

        dispatch({type: "POINTER_MOVE", pageX: event.pageX, pageY: event.pageY});

    };

    const onMouseUp = (event: any) => {

        //console.log('onMouseDown');
        event.preventDefault();
        event.stopPropagation();

        dispatch({type: "POINTER_UP", pageX: event.pageX, pageY: event.pageY});

        window.removeEventListener('mousemove', onMouseMove, false);
        window.removeEventListener('mouseup', onMouseUp, false);

    };

    const onTouchStart = (event: any) => {

        //console.log('onTouchStart');
        event.preventDefault();
        event.stopPropagation();

        const touch = event.changedTouches[0];

        dispatch({type: "POINTER_DOWN", pageX: touch.pageX, pageY: touch.pageY});

    };

    const onTouchMove = (event: any) => {

        //console.log('onMouseDown');
        event.preventDefault();
        event.stopPropagation();

        const touch = event.changedTouches[0];

        dispatch({type: "POINTER_MOVE", pageX: touch.pageX, pageY: touch.pageY});

    };

    const onTouchEnd = (event: any) => {

        //console.log('onMouseDown');
        event.preventDefault();
        event.stopPropagation();

        const touch = event.changedTouches[0];

        dispatch({type: "POINTER_UP", pageX: touch.pageX, pageY: touch.pageY});

    };

    const onItemClick = (event: any) => {

        //console.log("onItemClick ");

        const target = event.target;
        //console.log("itemClickHandler start", scrollerData.eventType, isNeedScroller);
    
        if(isNeedScroller){
    
            if(scrollerData.eventType === "CLICK"){
    
                //console.log("itemClickHandler eval", state.eventType);
                itemClickHandler(target);
    
            }
    
        }else{
    
            itemClickHandler(target);
    
        }
    
    };

    console.log("scroller render");

    /* RENDER */

    let finalListStyle: React.CSSProperties = {
        ...listStyle,
        transform: 'translateX(' + translateX + 'px)'
    };

    let mouseDownHandler: ((event: any) => void | undefined) | undefined = onMouseDown;
    let touchStartHandler: ((event: any) => void | undefined) | undefined = onTouchStart;
    let touchMoveHandler: ((event: any) => void | undefined) | undefined = onTouchMove;
    let touchEndHandler: ((event: any) => void | undefined) | undefined = onTouchEnd;

    if(!isNeedScroller){

        finalListStyle = {justifyContent: "center"};

        mouseDownHandler = undefined;
        touchStartHandler = undefined;
        touchMoveHandler = undefined;
        touchEndHandler = undefined;
    }

    return (
        
        <div className={classes.RScroller} ref={containerRef}>

            <ul
                ref={listRef}
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
                    itemRef)), [items, isNeedScroller, numberOfActiveItems]) }

            </ul>

        </div>
            
    );
};



export default RScroller;
        