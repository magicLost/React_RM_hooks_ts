import {ScrollerState, ScrollerAction, ScrollerData} from "./rscroller";
import * as calcTranslateX from "./../../../container/Scrollers/RScroller/Model/CaclTranslateX";
import {calcNumberOfActiveItems} from "./../../../container/Scrollers/RScroller/Model/ShowContent";
import * as identityEvent from "./../../../helper/IdentityEvent/IdentityEvent";

export const init = (
    calcXData: calcTranslateX.CalcXData,
    numberOfItems: number,
    listRef: React.RefObject<HTMLDivElement> | null,
    itemRef: React.RefObject<HTMLDivElement> | null
) => {

    if(listRef === null || itemRef === null)
    throw new Error("NO listRef or itemRef");

    calcTranslateX.setValues(listRef, itemRef, calcXData, numberOfItems);

    calcXData.translateX = 0;

    const isNeedScroll = calcTranslateX.isNeedScroller(calcXData, numberOfItems);

    const numberOfActiveItems = calcNumberOfActiveItems(calcXData.listWidth, calcXData.itemWidth, 0, 0, numberOfItems);

    return {isNeedScroller: isNeedScroll, numberOfActiveItems: numberOfActiveItems};
}

export const initAC = (

    state: ScrollerState, 
    action: ScrollerAction,
    calcXData: calcTranslateX.CalcXData,
    numberOfItems: number,
    listRef: React.RefObject<HTMLDivElement> | null,
    itemRef: React.RefObject<HTMLDivElement> | null
): ScrollerState => {

    const newData = init(calcXData, numberOfItems, listRef, itemRef);

    return { 
        ...state, 
        isNeedScroller: newData.isNeedScroller, 
        translateX: 0,
        numberOfActiveItems: newData.numberOfActiveItems 
    };
};

export const windowResizeAC = (

        state: ScrollerState, 
        action: ScrollerAction,
        calcXData: calcTranslateX.CalcXData,
        numberOfItems: number,
        listRef: React.RefObject<HTMLDivElement> | null,
        itemRef: React.RefObject<HTMLDivElement> | null
    ): ScrollerState => {

    const newData = init(calcXData, numberOfItems, listRef, itemRef);

    if(state.isNeedScroller === false){
    
        if(newData.isNeedScroller === false){

            return state;

        }else{

            return { ...state, isNeedScroller: true };

        }

    }else{

        if(newData.isNeedScroller === false){
            return {
                ...state,
                isNeedScroller: false,
                translateX: 0
            };
        }else{

            //check if translateX is out offsets
            //return translateX > this.maxTranslateOffset || translateX < this.minTranslateOffset;
            let translateX = state.translateX;

            if(translateX > calcXData.maxTranslateOffset){

                translateX = calcXData.maxTranslateOffset;

            }else if(translateX < calcXData.minTranslateOffset){

                translateX = calcXData.minTranslateOffset;

            }

            if(translateX !== state.translateX){
                return { ...state, translateX: translateX };
            }

            return state;

        }

    }
};

export const pointerDownAC = (
    state: ScrollerState, 
    action: ScrollerAction,
    scrollerData: ScrollerData,
    listRef: React.RefObject<HTMLDivElement> | null,
    containerRef: React.RefObject<HTMLDivElement> | null
): ScrollerState => {

    if(listRef === null || containerRef === null || action.pageX === undefined || action.pageY === undefined)  
        throw new Error("No listRef or containerRef or action.pageX/Y");

    //console.log("onPointerDown");

    calcTranslateX.onPointerDown(action.pageX, action.pageY, listRef, containerRef, scrollerData.calcXData);

    identityEvent.onTouchStart(action.pageX, action.pageY, scrollerData.identifyEventData);

    scrollerData.listStyle = {};
    scrollerData.eventType = '';

    if(state.translateX === scrollerData.calcXData.translateX)
        return state;

    return {
        ...state,
        translateX: scrollerData.calcXData.translateX
    };

};

export const pointerMoveAC = (
    state: ScrollerState, 
    action: ScrollerAction,
    scrollerData: ScrollerData,
    numberOfItems: number
): ScrollerState => {

    if(action.pageX === undefined || action.pageY === undefined)  
        throw new Error("No action.pageX/Y");

    const { calcXData, identifyEventData } = scrollerData;
    
    calcTranslateX.onPointerMove(action.pageX, action.pageY, calcXData);

    if(!calcXData.isYScroll){
    
        identityEvent.onTouchMove(action.pageX, identifyEventData);

        calcTranslateX.calcTranslateXOnMove(state.translateX, action.pageX, calcXData);

        const numberOfActiveItems = calcNumberOfActiveItems(
            calcXData.listWidth, 
            calcXData.itemWidth,
            calcXData.translateX,
            state.numberOfActiveItems,
            numberOfItems
        );

        return {
            ...state,
            translateX: calcXData.translateX,
            numberOfActiveItems: numberOfActiveItems 
            //isTranslated: true
        };

    }

    return state;

};

export const pointerUpAC = (
    state: ScrollerState, 
    action: ScrollerAction,
    //calcXData: CalcXData,
    //identifyData: IdentifyEventData,
    scrollerData: ScrollerData,
    numberOfItems: number,
): ScrollerState => {

    if(action.pageX === undefined || action.pageY === undefined)  
        throw new Error("No listRef or containerRef or action.pageX/Y");

    const { calcXData, identifyEventData } = scrollerData;

    if(!calcXData.isYScroll){
    
        calcTranslateX.onPointerUp(calcXData);

        //what event - move, swipe etc...
        identityEvent.onTouchEnd(action.pageX, identifyEventData);

        scrollerData.eventType = identityEvent.whatEventType(action.pageY, identifyEventData);

        //console.log("pointerUpAC", scrollerData.eventType);

        if(scrollerData.eventType === "CLICK"){

            return state;

        }

        if(state.translateX > calcXData.maxTranslateOffset){

            calcXData.translateX = calcXData.maxTranslateOffset;

        }else if(state.translateX < calcXData.minTranslateOffset){

            calcXData.translateX = calcXData.minTranslateOffset;

        }else if(scrollerData.eventType === "SWIPE" || scrollerData.eventType === "SWIPE_MOVE") {

            calcTranslateX.calcTranslateXOnSwipe(identityEvent.getSwipeSpeed(identifyEventData.lastFiveXToucheMoveSum), calcXData);

        }

        scrollerData.listStyle = { transition: 'transform 0.5s ease-out 0s' };

        const numberOfActiveItems = calcNumberOfActiveItems(
            calcXData.listWidth, 
            calcXData.itemWidth,
            calcXData.translateX, 
            state.numberOfActiveItems,
            numberOfItems
        );

        return {
            ...state,
            translateX: calcXData.translateX,
            numberOfActiveItems: numberOfActiveItems 
        }

    }

    calcTranslateX.onPointerUp(calcXData);

    return state;

};