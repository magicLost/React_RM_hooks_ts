import {useReducer, useRef, useEffect, CSSProperties} from "react";
import {initIdentifyEventData, IdentifyEventData, EVENT_TYPE} from "./../../../helper/IdentityEvent/IdentityEvent";
import {initCalcXData, CalcXData} from './../../../container/Scrollers/RScroller/Model/CaclTranslateX';
import {initAC, pointerDownAC, pointerMoveAC, pointerUpAC, windowResizeAC} from "./rscrollerAC";


export type ScrollerActions = "INIT" |"POINTER_DOWN" |"POINTER_MOVE" |"POINTER_UP" |"WINDOW_RESIZE" |"ITEM_CLICK";


export interface ScrollerData {

    calcXData: CalcXData;
    identifyEventData: IdentifyEventData;

    //itemRef: React.RefObject<HTMLLIElement> | null;
    //listRef: React.RefObject<HTMLUListElement> | null;
    //containerRef: React.RefObject<HTMLDivElement> | null;
    
    numberOfItems: number;
    listStyle: CSSProperties;
    eventType: EVENT_TYPE | '';
};

export interface ScrollerAction {
    type: ScrollerActions;
    //[name: string]: any;
    pageX?: number;
    pageY?: number;
    index?: number;
    //itemsLength?: number;
};

export interface ScrollerState {
    //calcXData: any;
    translateX: number,
    isNeedScroller: boolean,

    numberOfActiveItems: number,
};

const initScrollerData: ScrollerData = {
    calcXData: initCalcXData,
    identifyEventData: initIdentifyEventData,

    numberOfItems: 0,
    listStyle: {},
    eventType: ''
};

const initState: ScrollerState = {

    translateX: 0,
    isNeedScroller: false,

    numberOfActiveItems: 0,
}

export const useScroller = (items: any[]) => {

    const scrollerData = useRef(initScrollerData);
    const itemRef = useRef(null);
    const listRef = useRef(null);
    const containerRef = useRef(null);

    //const numberOfItems = items.length;

    useEffect(() => {

        //console.log("useScroller useEffect", itemRef, containerRef);
        scrollerData.current.numberOfItems = items.length;
        dispatch({type: "INIT"});

    }, [items]);

    const reducer = (state: ScrollerState, action: ScrollerAction) => {

        //state.calcData.itemsLength = itemsLength;

        switch(action.type){

            //call init when scrollerItems change and onDidMount
            case "INIT": return initAC(state, action, scrollerData.current.calcXData, scrollerData.current.numberOfItems, listRef, itemRef);

            case "POINTER_DOWN": return pointerDownAC(state, action, scrollerData.current, listRef, containerRef);

            case "POINTER_MOVE": return pointerMoveAC(state, action, scrollerData.current, scrollerData.current.numberOfItems);

            case "POINTER_UP": return pointerUpAC(state, action, scrollerData.current, scrollerData.current.numberOfItems);

            case "WINDOW_RESIZE": return windowResizeAC(state, action, scrollerData.current.calcXData, scrollerData.current.numberOfItems, listRef, itemRef);

            //case "ITEM_CLICK": return onDecreaseIndexAC(state, action);

            default: return state;
        }

    }

    const [state, dispatch] = useReducer(reducer, initState);

    return {

        translateX: state.translateX,
        isNeedScroller: state.isNeedScroller,
        numberOfActiveItems: state.numberOfActiveItems,
        listStyle: scrollerData.current.listStyle,
        eventType: scrollerData.current.eventType,
        itemRef: itemRef,
        listRef: listRef,
        containerRef: containerRef,
        scrollerData: scrollerData.current,
        dispatch: dispatch
    };// [ state.controller, state.translateX, state.isNeedScroller, state.numberOfActiveItems ]; 

};