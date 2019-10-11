/* DATA */

export type EVENT_TYPE = "CLICK" | "LONG_TAP" | "SWIPE" | "SWIPE_MOVE" | "MOVE";

export interface IdentifyEventData {

    startX: number;
    startY: number;

    lastX: number;
    lastFiveXTouchMove: number[];
    lastFiveXTouchMoveIndex: number;
    lastFiveXToucheMoveSum: number;

    dist: number;

    elapsedTime: number;
    elapsedTimeAfterMove: number;
    startTime: number;
    startTimeAfterMove: number;

    swipeSpeed: number;

    config: IdentifyEventConfig;
};

export interface IdentifyEventConfig {

    threshold: number;//120
    restraint: number;//100
    allowedTime: number;//200
    allowedTimeToMoveSwipe: number;//30
};

export const initIdentifyEventData: IdentifyEventData = {

    startX:  0,
    startY:  0,

    lastX:  0,
    lastFiveXTouchMove: [],
    lastFiveXTouchMoveIndex:  0,
    lastFiveXToucheMoveSum:  0,

    dist:  0,

    elapsedTime:  0,
    elapsedTimeAfterMove:  0,
    startTime:  0,
    startTimeAfterMove:  0,

    swipeSpeed:  0,

    config: {

        threshold: 120,
        restraint: 100,
        allowedTime: 200,
        allowedTimeToMoveSwipe: 30
    }
}

/* METHODS */

export const whatEventType = (pageY: number, data: IdentifyEventData): EVENT_TYPE => {

    if(data.dist === 0){

        if(data.elapsedTime > 200){

            return "LONG_TAP";

        }else{

            return "CLICK";

        }

    }else{

        if(isSwipe(pageY, data)){

            return "SWIPE";

        }else if(isSwipeAfterMoving(pageY, data)){

            return "SWIPE_MOVE";

        }


        return "MOVE";

    }

};

export const onTouchStart = (pageX: number, pageY: number, data: IdentifyEventData) => {

    data.lastFiveXTouchMove = [];
    data.lastFiveXTouchMoveIndex = 0;
    data.lastFiveXToucheMoveSum = 0;

    data.swipeSpeed = 0;
    data.dist = 0;
    data.startX = pageX;
    data.lastX = pageX;

    data.startY = pageY;
    data.startTime = new Date().getTime(); // record time when finger first makes contact with surface
};

export const onTouchMove = (pageX: number, data: IdentifyEventData) => {

    let speed = data.lastX - pageX;

    data.lastX = pageX;

    data.lastFiveXTouchMove[data.lastFiveXTouchMoveIndex] = speed;

    data.lastFiveXTouchMoveIndex = (data.lastFiveXTouchMoveIndex >= 4) ? 0 : data.lastFiveXTouchMoveIndex + 1;

    data.startTimeAfterMove = new Date().getTime();
};

export const onTouchEnd = (pageX: number, data: IdentifyEventData) => {

    data.dist = pageX - data.startX; // get total dist traveled by finger while in contact with surface

    data.elapsedTime = new Date().getTime() - data.startTime; // get time elapsed
    data.elapsedTimeAfterMove = new Date().getTime() - data.startTimeAfterMove;
};

export const isSwipe = (pageY: number, data: IdentifyEventData): boolean => {

    for(let value of data.lastFiveXTouchMove){

        data.lastFiveXToucheMoveSum += value;

    }

    return  (data.elapsedTime <= data.config.allowedTime && Math.abs(data.dist) >= data.config.threshold && Math.abs(pageY - data.startY) <= data.config.restraint);

};

export const isSwipeAfterMoving = (pageY: number, data: IdentifyEventData): boolean => {

    /* this.lastFiveXTouchMove.map((value) => {
         this.lastFiveXToucheMoveSum += value;
     });*/

    for(let value of data.lastFiveXTouchMove){

        data.lastFiveXToucheMoveSum += value;

    }


    return (Math.abs(data.lastFiveXToucheMoveSum) > 50) && (Math.abs(pageY - data.startY) <= data.config.restraint && data.elapsedTimeAfterMove <= data.config.allowedTimeToMoveSwipe);

};

export const getSwipeSpeed = (lastFiveXToucheMoveSum: number): number => {

    let speed = lastFiveXToucheMoveSum * -1 / 100;

    if(speed > 0){

        if(speed < 1)
            return 1;
        if(speed > 3)
            return 3;

    }else{

        if(speed < -3)
            return -3;
        if(speed > -1)
            return -1;

    }

    return speed;

};




