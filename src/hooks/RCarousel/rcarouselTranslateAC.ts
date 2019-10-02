import {CarouselTranslateState, CarouselAction} from "./rcarousel";
//import {onPointerDown, onPointerMove, onPointerUp, isEnoughDist, isIndexIncrease} from "./../../container/RCarousel/RCarouselTranslate/Model/CalcTranslateX";
//import { calcDecreasedIndex, calcIncreasedIndex } from "../../utility/utility";
import {
    onPointerDownAC as baseOnPointerDownAC,
    onPointerMoveAC as baseOnPointerMoveAC,
    onPointerUpAC as baseOnPointerUpAC
} from "./rcarouselAC";


export const onPointerDownAC = (state: CarouselTranslateState, action: CarouselAction): CarouselTranslateState => {

    //is need return state
    baseOnPointerDownAC(state, action);

    return {
        ...state,
        isTranslated: true,
        translateX: state.calcData.translateX
    }
};

export const onPointerMoveAC = (state: CarouselTranslateState, action: CarouselAction) => {

    baseOnPointerMoveAC(state, action);

    if(state.translateX !== state.calcData.translateX){

        return {...state, translateX: state.calcData.translateX};

    }else{

        return state;
    }

};

export const onPointerUpAC = (state: CarouselTranslateState, action: CarouselAction) => {

    //console.log("onPointerUp");

    let newIndex = baseOnPointerUpAC(state, action);

    return {

        ...state,
        isTranslated: false,
        translateX: 0,
        activeIndex: newIndex
    };
};
