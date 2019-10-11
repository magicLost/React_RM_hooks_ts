import {CalcXData} from "../../../hooks/Carousels/RCarousel/rcarousel";


export const onPointerDown = (data: CalcXData, pageX: number, pageY: number) => {

    data.pageXStart = pageX;
    data.pageYStart = pageY;
    data.prevPageX = pageX;
    data.dist = 0;


};

export const onPointerMove = (data: CalcXData, pageX: number, pageY: number, activeIndex: number, itemsLength: number) => {

    //console.log("onPointerMove", pageX);

    if(data.isFirstMove){

        data.isYScroll = isYScrollFunc(data, pageX, pageY);

        data.isFirstMove = false;

    }

    if(data.isYScroll) return ;

    data.dist = data.pageXStart - pageX;

    data.translateX += calcTranslateXOnMove(data, pageX, activeIndex, itemsLength);

    data.prevPageX = pageX;

};

export const onPointerUp = (data: CalcXData) => {

    data.isYScroll = false;
    data.isFirstMove = true;

    data.translateX = 0;

};



export const calcTranslateXOnMove = (data: CalcXData, pageX: number, activeIndex: number, itemsLength: number) => {

    if(activeIndex === 0 && data.translateX > 0){

        if(pageX > data.prevPageX){

            if(data.translateX > data.offset) return 0;

            return 0.3;

        }

    }else if(activeIndex === itemsLength - 1 && data.translateX < 0){

        if(pageX < data.prevPageX){

            if(data.translateX < -data.offset) return 0;

            return -0.3;

        }

    }

    return pageX - data.prevPageX;

};

export const isIndexIncrease = (dist: number) => {

    return dist > 0;

};

export const isEnoughDist = (dist: number) => {

    return Math.abs(dist) > 25;

};

export const isYScrollFunc = (data: CalcXData, pageX: number, pageY: number) => {

    const distX = Math.abs(pageX - data.pageXStart);
    const distY = Math.abs(pageY - data.pageYStart);

    //console.log("distX " + distX);
    //console.log(event);

    return distY > distX;

};