import {useReducer, useRef} from "react";
import { IRCarouselController } from "../../../container/Carousels/RCarousel/RCarouselController";
import RCarouselTranslateController from "../../../container/Carousels/RCarousel/RCarouselTranslate/Controller/RCarouselTranslateController";
import CalcTranslateX from "../../../container/Carousels/RCarousel/CalcTranslateX";
import RCarouselOpacityController from "../../../container/Carousels/RCarousel/RCarouselOpacity/Controller/RCarouselOpacityController";
import CastTranslateXToOpacity from "../../../container/Carousels/RCarousel/RCarouselOpacity/Model/CastTranslateXToOpacity";

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

/* DECLARE STATE */
export interface CarouselState {

    //translateX: number;
    activeIndex: number;

    isTranslated: boolean;
}

export interface CarouselTranslateState extends CarouselState {
    
    translateX: number;
}

export interface CarouselOpacityState extends CarouselState {
    opacity: number;
}

export const initState: CarouselState = {
    
    //translateX: 0,
    activeIndex: 0,

    isTranslated: false
};

export const useCarouselTranslate = (itemsLength: number) => {

    const controllerRef: React.MutableRefObject<IRCarouselController | null> = useRef(null);
    const isInitRef: React.MutableRefObject<boolean> = useRef(false);

    if(isInitRef.current === false){
        controllerRef.current = new RCarouselTranslateController(new CalcTranslateX(), itemsLength);
        isInitRef.current = true;
    }

    if(controllerRef.current === null) throw new Error("No controller");

    const [state, dispatch] = useReducer(controllerRef.current.reducer, undefined, (): CarouselTranslateState => {

        const initState: CarouselTranslateState = {
    
            translateX: 0,

            activeIndex: 0,
        
            isTranslated: false
        };

        return initState;

    });

    controllerRef.current.dispatch = dispatch;

    return {
        controller: controllerRef.current,
        translateX: (state as CarouselTranslateState).translateX,
        isTranslated: state.isTranslated,
        activeIndex: state.activeIndex
    };

};

export const useCarouselOpacity = (itemsLength: number) => {

    const controllerRef: React.MutableRefObject<IRCarouselController | null> = useRef(null);
    const isInitRef: React.MutableRefObject<boolean> = useRef(false);

    if(isInitRef.current === false){
        controllerRef.current = new RCarouselOpacityController(new CalcTranslateX(), new CastTranslateXToOpacity(), itemsLength);
        isInitRef.current = true;
    }

    if(controllerRef.current === null) throw new Error("No controller");

    const [state, dispatch] = useReducer(controllerRef.current.reducer, undefined, (): CarouselOpacityState => {

        const initState: CarouselOpacityState = {
    
            opacity: 1,

            activeIndex: 0,
        
            isTranslated: false
        };

        return initState;

    });

    controllerRef.current.dispatch = dispatch;
    controllerRef.current.itemsLength = itemsLength;

    return {
        controller: controllerRef.current,
        opacity: (state as CarouselOpacityState).opacity,
        isTranslated: state.isTranslated,
        activeIndex: state.activeIndex
    };
};