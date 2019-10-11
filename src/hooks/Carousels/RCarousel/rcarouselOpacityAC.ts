import {CarouselOpacityState, CarouselAction} from "./rcarousel";
//import {onPointerDown, onPointerMove, onPointerUp, isEnoughDist, isIndexIncrease} from "./../../container/RCarousel/RCarouselTranslate/Model/CalcTranslateX";
//import { calcDecreasedIndex, calcIncreasedIndex } from "../../utility/utility";
import { calcOpacityByTranslateX, getBodyWidth } from "../../../container/Carousels/RCarousel/RCarouselOpacity/Model/CastTranslateXToOpacity";
import {
    onPointerDownAC as baseOnPointerDownAC,
    onPointerMoveAC as baseOnPointerMoveAC,
    onPointerUpAC as baseOnPointerUpAC
} from "./rcarouselAC";


export const onPointerDownAC = (state: CarouselOpacityState, action: CarouselAction) => {

    baseOnPointerDownAC(state, action);
    
    state.calcData.bodyWidth = getBodyWidth();

    return {
        ...state,
        isTranslated: true,
    }
};

export const onPointerMoveAC = (state: CarouselOpacityState, action: CarouselAction) => {

    baseOnPointerMoveAC(state, action);

    const newOpacity = calcOpacityByTranslateX(state.calcData.translateX, state.calcData.bodyWidth);

    if(state.opacity !== newOpacity){

        return {...state, opacity: newOpacity};

    }else{

        return state;
    }

};

export const onPointerUpAC = (state: CarouselOpacityState, action: CarouselAction) => {

    //console.log("onPointerUp");

    let newIndex = baseOnPointerUpAC(state, action);

    return {

        ...state,
        isTranslated: false,
        opacity: 1,
        activeIndex: newIndex
    };
};
