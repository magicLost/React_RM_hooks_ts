import {CSSProperties} from 'react';

export const getListStyle = (activeIndex: number, translateX: number, isTranslated: boolean) => {

    const listStyle: CSSProperties = {
        transform: 'translateX(' + stringifyTranslateX(activeIndex, translateX) + ')'
    };

    if(!isTranslated){

        listStyle.transitionProperty = 'transform';
        listStyle.transitionDuration = '0.3s';
    }

    return listStyle;
};

export const stringifyTranslateX = (activeIndex: number, translateX: number) => {

    const translateByActiveIndex = - activeIndex * 100 + '%';

    return  'calc(' + translateByActiveIndex + " + " + translateX + 'px)';

};
