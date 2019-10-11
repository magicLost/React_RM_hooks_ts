import React, {useMemo} from 'react';
import classes from './CarouselOpacity.module.scss';
import { useCarouselOpacity } from '../../../../hooks/Carousels/Carousel/carousel';

        
interface CarouselOpacityProps  {
    itemsLength: number;
    items: any[];
    getItems: (
        itemClass: string, 
        getItemStyle: (isTranslated: boolean, opacity: number, activeIndex: number, index: number) => any, 
        isTranslated: boolean, 
        opacity: number,
        activeIndex: number) => JSX.Element[];
    activeIndex: number;
    increaseActiveIndex: () => void | undefined;
    decreaseActiveIndex: () => void | undefined;
}

const CarouselOpacity = ({itemsLength, items, getItems, activeIndex, increaseActiveIndex, decreaseActiveIndex}: CarouselOpacityProps) => {

    const {controller, opacity, isTranslated} = useCarouselOpacity(increaseActiveIndex, decreaseActiveIndex);

    controller.activeIndex = activeIndex;
    controller.itemsLength = itemsLength;
    //controller.increaseActiveIndex = increaseActiveIndex;
    //controller.decreaseActiveIndex = decreaseActiveIndex;

    console.log("render carouselOpacity", opacity, isTranslated);

    const getItemStyle = (isTranslated: boolean, opacity: number, activeIndex: number, index: number) => {

        let style = undefined;

        if(activeIndex === index){

            if(isTranslated){

                style = {
                    transitionProperty: 'opacity',
                    opacity: opacity >= 0.5 ? opacity : 0.5
                }

            }else{

                style = {
                    transitionProperty: 'opacity',
                    transitionDuration: '1s',
                    opacity: opacity
                }

            }

        }

        return style;
    };

    return (
        
        <div className={classes.CarouselOpacity}>

            <ul
                className={classes.ItemsList}
                onMouseDown={controller.onMouseDown}
                onTouchStart={controller.onTouchStart}
                onTouchMove={controller.onTouchMove}
                onTouchEnd={controller.onTouchEnd}
            >

                { useMemo(() => getItems(classes.Item, getItemStyle, isTranslated, opacity, activeIndex), [activeIndex, items, opacity, isTranslated]) }

            </ul>

        </div>
            
    );
};

export default CarouselOpacity;
        