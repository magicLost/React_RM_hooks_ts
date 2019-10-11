import ScrollerController from "../../../container/Scrollers/Scroller/Controller/ScrollerController";

export interface ScrollerState {

    controller: ScrollerController;
    translateX: number;
    isNeedScroller: boolean;

    numberOfActiveItems: number;

}