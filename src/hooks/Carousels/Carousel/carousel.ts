import {useState} from 'react';
import {CarouselOpacityState, CarouselTranslateState} from "./types";
import CarouselOpacityController from '../../../container/Carousels/Carousel/CarouselOpacity/Controller/CarouselOpacityController';
import CalcTranslateX from '../../../container/Carousels/Carousel/CalcTranslateX';
import CastTranslateXToOpacity from '../../../container/Carousels/Carousel/CarouselOpacity/Model/CastTranslateXToOpacity';
import CarouselTranslateController from '../../../container/Carousels/Carousel/CarouselTranslate/Controller/CarouselTranslateController';


export const useCarouselOpacity = (
    increaseActiveIndex: () => void | undefined, 
    decreaseActiveIndex: () => void | undefined
    ) => {

    const [state, setState] = useState(() => {

        const controller = new CarouselOpacityController(
            new CalcTranslateX(),
            increaseActiveIndex,
            decreaseActiveIndex,
            new CastTranslateXToOpacity()
        );

        const initState: CarouselOpacityState = {

            controller: controller,
            opacity: 1,
            isTranslated: false,
            translateX: 0

        }

        return initState;

    });

    (state.controller as CarouselOpacityController).setState = setState;

    return {
        controller: state.controller,
        opacity: state.opacity,
        isTranslated: state.isTranslated
    }

}

export const useCarouselTranslate = (
    increaseActiveIndex: () => void | undefined, 
    decreaseActiveIndex: () => void | undefined
    ) => {

    const [state, setState] = useState(() => {

        const controller = new CarouselTranslateController(
            new CalcTranslateX(),
            increaseActiveIndex,
            decreaseActiveIndex
        );

        const initState: CarouselTranslateState = {

            controller: controller,
            listStyle: {
                transitionProperty: 'transform',
                transitionDuration: '0.5s'
            },
            isTranslated: false,
            translateX: 0

        }

        return initState;

    });

    (state.controller as CarouselTranslateController).setState = setState;

    return {
        controller: state.controller,
        listStyle: state.listStyle,
        //isTranslated: state.isTranslated,
        translateX: state.translateX
    }

}
