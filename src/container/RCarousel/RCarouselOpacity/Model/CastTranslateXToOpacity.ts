
export const getBodyWidth = () => {

    return document.documentElement.clientWidth;

};

export const calcOpacityByTranslateX = (translateX: number, bodyWidth: number) => {

    //console.log("calcOpacityByTranslateX", translateX, this.bodyWidth, Math.abs(translateX / this.bodyWidth));
    return 1 - Math.abs(translateX / bodyWidth);

}