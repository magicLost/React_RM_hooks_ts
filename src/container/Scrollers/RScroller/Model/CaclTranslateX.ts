import { clamp } from "../../../../helper/MathF";

export interface CalcXData {

    isYScroll: boolean,
    isFirstMove: boolean,

    //numberOfItems: number;

    listWidth: number,
    itemWidth: number,

    swipeDist: number,

    minTranslateOffset: number,
    maxTranslateOffset: number,

    pageXStart: number,
    pageYStart: number,
    prevPageX: number,
    pageX: number,

    translateX: number,
};

export const initCalcXData: CalcXData = {

    isYScroll: false,
    isFirstMove: true,

    listWidth: 0,
    itemWidth: 0,

    swipeDist: 0,

    minTranslateOffset: 0,
    maxTranslateOffset: 0,

    pageXStart: 0,
    pageYStart: 0,
    prevPageX: 0,
    pageX: 0,

    translateX: 0,
}

export const setValues = (
        listRef: React.RefObject<HTMLElement>, 
        itemRef: React.RefObject<HTMLElement>, 
        data: CalcXData,
        numberOfItems: number
    ) => {

    if(listRef.current === null || itemRef.current === null)
        throw new Error("No listRef or itemRef");

    data.listWidth = listRef.current.getBoundingClientRect().width;
    data.itemWidth = itemRef.current.getBoundingClientRect().width;

    setTranslateOffsets(data, numberOfItems);

    data.swipeDist = Math.round(data.itemWidth * numberOfItems / 10);

    /* console.log("minTranslateOffset = " + this.minTranslateOffset);
     console.log("maxTranslateOffset = " + this.maxTranslateOffset);
     console.log("listWidth = " + this.listWidth);
     console.log("itemWidth = " + this.itemWidth);*/

};

export const onPointerDown = (
        pageX: number, 
        pageY: number, 
        listRef: React.RefObject<HTMLElement>, 
        containerRef: React.RefObject<HTMLDivElement>,
        data: CalcXData
    ) => {

    data.pageXStart = pageX;
    data.pageYStart = pageY;
    data.prevPageX = pageX;

    if(listRef.current === null || containerRef.current === null)
        throw new Error("No listRef or containerRef");

    const offsetX = Math.abs((containerRef.current.getBoundingClientRect() as DOMRect).x)
    data.translateX = (listRef.current.getBoundingClientRect() as DOMRect).x - offsetX;

    //console.log("DOWN ", listRef.current.getBoundingClientRect());

};

export const onPointerMove = (pageX: number, pageY: number, data: CalcXData) => {

    if(data.isFirstMove){

        data.isYScroll = isYScrollFunc(pageX, pageY, data.pageXStart, data.pageYStart);

        data.isFirstMove = false;
    }
};

export const onPointerUp = (data: CalcXData) => {

    data.isFirstMove = true;
    data.isYScroll = false;

};

export const setTranslateOffsets = (data: CalcXData, numberOfItems: number) => {

    data.maxTranslateOffset = 0;
    data.minTranslateOffset = data.listWidth - data.itemWidth * numberOfItems;

};

export const isOutsideOffset = (translateX: number, maxTranslateOffset: number, minTranslateOffset: number) => {

    return translateX > maxTranslateOffset || translateX < minTranslateOffset;
};

export const calcTranslateXOnMove = (stateTranslateX: number, pageX: number, data: CalcXData) => {

    let translateX = 0;

    if(stateTranslateX > data.maxTranslateOffset){

        if(pageX > data.prevPageX){

            translateX += 0.3;

        }else{

            //translateX -= 0.3;
            translateX = pageX - data.prevPageX;

        }

    }else if(stateTranslateX < data.minTranslateOffset){

        if(pageX > data.prevPageX){

            //translateX += 0.3;
            translateX = pageX - data.prevPageX;

        }else{

            translateX -= 0.3;


        }

    }else{

        translateX = pageX - data.prevPageX;

    }

    data.prevPageX = pageX;


    translateX = data.translateX + translateX;
    translateX = clamp(translateX, data.minTranslateOffset - 50, data.maxTranslateOffset + 50);

    data.translateX = translateX;
};

export const calcTranslateXOnSwipe = (speed: number, data: CalcXData) => {

    let translateX = data.swipeDist * speed;

    translateX = data.translateX + translateX;
    translateX = clamp(translateX, data.minTranslateOffset, data.maxTranslateOffset);

    data.translateX = translateX;

};

export const isNeedScroller = (data: CalcXData, numberOfItems: number) => {

    return data.itemWidth * numberOfItems - data.listWidth > 0;

};

export const isYScrollFunc = (pageX: number, pageY: number, pageXStart: number, pageYStart: number) => {

    const distX = Math.abs(pageX - pageXStart);
    const distY = Math.abs(pageY - pageYStart);

    //console.log("distX ", distX);
    //console.log("distY ", distY);

    //console.log(event);

    return distY > distX;

};