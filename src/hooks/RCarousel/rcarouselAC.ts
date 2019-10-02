import {CarouselState, CarouselAction} from "./rcarousel";
import { calcDecreasedIndex, calcIncreasedIndex } from "../../utility/utility";
import { clamp } from "../../helper/MathF";
import {onPointerDown, onPointerMove, onPointerUp, isEnoughDist, isIndexIncrease} from "../../container/RCarousel/RCarouselModel";


export const onPointerDownAC = (state: CarouselState, action: CarouselAction) => {

    console.log("onPointerDown");

    if(action.pageX === undefined || action.pageY === undefined) throw new Error("No pageX or pageY");

    onPointerDown(state.calcData, action.pageX, action.pageY);
    
    //return state;
};

export const onPointerMoveAC = (state: CarouselState, action: CarouselAction) => {

    console.log("onPointerMove");

    const calcData = state.calcData;

    if(action.pageX === undefined || action.pageY === undefined) throw new Error("No pageX or pageY");

    onPointerMove(calcData, action.pageX, action.pageY, state.activeIndex, calcData.itemsLength);

    //return state;
};

export const onPointerUpAC = (state: CarouselState, action: CarouselAction) => {

    //console.log("onPointerUp");

    let newIndex = state.activeIndex;

    if(!state.calcData.isYScroll && isEnoughDist(state.calcData.dist)){

        if(isIndexIncrease(state.calcData.dist)){

            newIndex = calcIncreasedIndex(newIndex, state.calcData.itemsLength);

        }else{

            newIndex = calcDecreasedIndex(newIndex);
        }
    }

    onPointerUp(state.calcData);

    return newIndex;
};


export const onIncreaseIndexAC = (state: CarouselState, action: CarouselAction) => {

    const newIndex = calcIncreasedIndex(state.activeIndex, state.calcData.itemsLength);
    return { ...state, activeIndex: newIndex };

};

export const onDecreaseIndexAC = (state: CarouselState, action: CarouselAction) => {

    const newIndex = calcDecreasedIndex(state.activeIndex);
                return { ...state, activeIndex: newIndex };

};

export const onSetIndexAC = (state: CarouselState, action: CarouselAction) => {

    if(action.index === undefined) throw new Error("No new index");

    const newIndex = clamp(action.index, 0, state.calcData.itemsLength - 1);

    if(newIndex === state.activeIndex) return state;
                
    return { ...state, activeIndex: newIndex };

};