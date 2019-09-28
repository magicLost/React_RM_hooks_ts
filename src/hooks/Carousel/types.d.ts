import {ICarouselController} from "./../../container/Carousel/types";

interface CarouselState {

    controller: ICarouselController;
    isTranslated: boolean;
    translateX: number;
}

export interface CarouselOpacityState extends CarouselState {

    opacity: number;
}

export interface CarouselTranslateState extends CarouselState {

    listStyle: any;
}