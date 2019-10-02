import {useReducer} from "react";
import { onIncreaseIndexAC, onDecreaseIndexAC, onSetIndexAC } from "./rcarouselAC";
import {
    onPointerDownAC as onPointerDownTranslateAc, 
    onPointerMoveAC as onPointerMoveTranslateAc,  
    onPointerUpAC as onPointerUpTranslateAc, 
} from "./rcarouselTranslateAC";
import {
    onPointerDownAC as onPointerDownOpacityAc, 
    onPointerMoveAC as onPointerMoveOpacityAc,  
    onPointerUpAC as onPointerUpOpacityAc, 
} from "./rcarouselOpacityAC"

/* DECLARE ACTIONS */
export type CarouselActions = "POINTER_DOWN" | "POINTER_MOVE" |"POINTER_UP" |"INCREASE_INDEX" |"DECREASE_INDEX" |"SET_INDEX";

export type CarouselAction = {
    type: CarouselActions;
    //[name: string]: any;
    pageX?: number;
    pageY?: number;
    index?: number;
    //itemsLength?: number;
};

/* DECLARE CALC_TRANSLATE_X DATA */
export interface CalcXData {

    itemsLength: number;

    dist: number;

    prevPageX: number;
    pageXStart: number;
    pageYStart: number;

    isYScroll: boolean;
    isFirstMove: boolean;

    offset: number;

    translateX: number;
}

export interface CalcXOpacityData extends CalcXData{
    bodyWidth: number;
}

/* DECLARE STATE */
export interface CarouselState {

    calcData: CalcXData;

    //translateX: number;
    activeIndex: number;

    isTranslated: boolean;
}

export interface CarouselTranslateState extends CarouselState {
    
    translateX: number;
}

export interface CarouselOpacityState extends CarouselState {
    calcData: CalcXOpacityData;
    opacity: number;
}

const initState: CarouselState = {

    calcData: {

        itemsLength: 0,

        dist: 0,
    
        prevPageX: 0,
        pageXStart: 0,
        pageYStart: 0,
    
        isYScroll: false,
        isFirstMove: true,
    
        offset: 0,
    
        translateX: 0
    },
    
    //translateX: 0,
    activeIndex: 0,

    isTranslated: false
};

export const useCarouselTranslate = (itemsLength: number) => {

    const reducer = (state: CarouselTranslateState, action: CarouselAction) => {

        //console.log(state, action);
        state.calcData.itemsLength = itemsLength;

        switch(action.type){

            case "POINTER_DOWN": return onPointerDownTranslateAc(state, action);

            case "POINTER_MOVE": return onPointerMoveTranslateAc(state, action);

            case "POINTER_UP": return onPointerUpTranslateAc(state, action);

            case "INCREASE_INDEX": return onIncreaseIndexAC(state, action) as CarouselTranslateState;

            case "DECREASE_INDEX": return onDecreaseIndexAC(state, action) as CarouselTranslateState;

            case "SET_INDEX": return onSetIndexAC(state, action) as CarouselTranslateState;

            default: return state;
        }

    };

    const [state, dispatch] = useReducer(reducer, undefined, (): CarouselTranslateState => {

        initState.calcData.itemsLength = itemsLength;
        (initState as CarouselTranslateState).translateX = 0

        return (initState as CarouselTranslateState);

    });

    return {
        translateX: state.translateX,
        isTranslated: state.isTranslated,
        activeIndex: state.activeIndex,
        dispatch: dispatch
    };

};

export const useCarouselOpacity = (itemsLength: number) => {

    const reducer = (state: CarouselOpacityState, action: CarouselAction) => {

        //console.log(state, action);
        state.calcData.itemsLength = itemsLength;

        switch(action.type){

            case "POINTER_DOWN": return onPointerDownOpacityAc(state, action);

            case "POINTER_MOVE": return onPointerMoveOpacityAc(state, action);

            case "POINTER_UP": return onPointerUpOpacityAc(state, action);

            case "INCREASE_INDEX": return onIncreaseIndexAC(state, action) as CarouselOpacityState;

            case "DECREASE_INDEX": return onDecreaseIndexAC(state, action) as CarouselOpacityState;

            case "SET_INDEX": return onSetIndexAC(state, action) as CarouselOpacityState;

            default: return state;
        }

    };

    const [state, dispatch] = useReducer(reducer, undefined, (): CarouselOpacityState => {

        initState.calcData.itemsLength = itemsLength;
        (initState as CarouselOpacityState).calcData.bodyWidth = 0;
        (initState as CarouselOpacityState).opacity = 1

        return (initState as CarouselOpacityState);

    });

    return {
        opacity: state.opacity,
        isTranslated: state.isTranslated,
        activeIndex: state.activeIndex,
        dispatch: dispatch
    };

};