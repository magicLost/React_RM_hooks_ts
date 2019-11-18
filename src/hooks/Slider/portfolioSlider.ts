import {useReducer, useState} from "react";
import { useCarouselOpacity } from "../Carousels/RCarousel/rcarousel";
import { clamp } from "../../helper/MathF";
import {PortfolioPhotosByCategory} from "../../data/types";

export interface PortfolioSliderState{
    categoryIndex: number;
    categoriesLength: number;
}

export type PortfolioSliderActions = "SET_CATEGORY_INDEX";

export type PortfolioSliderAction = {
    type: PortfolioSliderActions;
    index: number;
}

export const onSetCategoryIndexAC = (state: PortfolioSliderState, action: PortfolioSliderAction) => {

    const newIndex = clamp(action.index, 0, state.categoriesLength - 1);

    //carouselOpacityDispatch({type: "SET_INDEX", index: 0});

    return newIndex !== state.categoryIndex ? {...state, categoryIndex: newIndex} : state;

};

export const usePortfolioSlider = (photos: PortfolioPhotosByCategory[], categoriesLength: number) => {


    const reducer = (state: PortfolioSliderState, action: PortfolioSliderAction) => {

        //console.log(state, action);
        //state.calcData.itemsLength = photosLength;

        switch(action.type){

            case "SET_CATEGORY_INDEX": return onSetCategoryIndexAC(state, action);

            default: return state;
        }

    };

    const [state, dispatch] = useReducer(reducer, undefined, (): PortfolioSliderState => {

        const initState: PortfolioSliderState  = {
            categoryIndex: 0,
            categoriesLength: categoriesLength
        };

        return initState;
    });

    const { opacity, isTranslated, activeIndex, controller} = useCarouselOpacity(photos[state.categoryIndex].size300.length); 

    return {
        categoryIndex: state.categoryIndex,
        opacity: opacity,
        isTranslated: isTranslated,
        photoIndex: activeIndex,
        carouselController: controller,
        dispatch: dispatch
    }; 
} 

/* export const usePortfolioSlider = (photosLength: number) => {

    //const { opacity, isTranslated, activeIndex, dispatch } = useCarouselOpacity(photosLength);


    const reducer = (state: PortfolioSliderState, action: CarouselAction) => {

        //console.log(state, action);
        state.calcData.itemsLength = photosLength;

        switch(action.type){

            case "POINTER_DOWN": return onPointerDownOpacityAc(state, action) as PortfolioSliderState;

            case "POINTER_MOVE": return onPointerMoveOpacityAc(state, action) as PortfolioSliderState;

            case "POINTER_UP": return onPointerUpOpacityAc(state, action) as PortfolioSliderState;

            case "INCREASE_INDEX": return onIncreaseIndexAC(state, action) as PortfolioSliderState;

            case "DECREASE_INDEX": return onDecreaseIndexAC(state, action) as PortfolioSliderState;

            case "SET_INDEX": return onSetIndexAC(state, action) as PortfolioSliderState;

            default: return state;
        }

    };

    const [state, dispatch] = useReducer(reducer, undefined, (): PortfolioSliderState => {

        initState.calcData.itemsLength = photosLength;
        (initState as PortfolioSliderState).calcData.bodyWidth = 0;
        (initState as PortfolioSliderState).opacity = 1;
        (initState as PortfolioSliderState).categoryIndex = 0;

        return (initState as PortfolioSliderState);

    });

    return {
        opacity: state.opacity,
        isTranslated: state.isTranslated,
        activeIndex: state.activeIndex,
        dispatch: dispatch
    };


} */