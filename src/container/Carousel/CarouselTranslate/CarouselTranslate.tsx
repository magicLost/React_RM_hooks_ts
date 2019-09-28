import React, {useMemo} from 'react';
import classes from './CarouselTranslate.module.scss';
import { useCarouselTranslate } from '../../../hooks/Carousel/carousel';
        
interface CarouselTranslateProps  {
    items: any[];
    getItems: (
        //items: any[],
        itemClass: string, 
        activeIndex: number) => JSX.Element[];
    activeIndex: number;
    increaseActiveIndex: () => void | undefined;
    decreaseActiveIndex: () => void | undefined;
}

const CarouselTranslate = ({items, activeIndex, increaseActiveIndex, decreaseActiveIndex, getItems}: CarouselTranslateProps) => {

    const {controller, listStyle, translateX} = useCarouselTranslate(increaseActiveIndex, decreaseActiveIndex);

    console.log("render carouselTranslate", listStyle, translateX, activeIndex);

    const finalTranslateX = controller.calc.getTranslateX(activeIndex, translateX);

    const finalListStyle = {
        ...listStyle,
        transform: 'translateX(' + finalTranslateX + ')'
    };

    return (
        
        <div className={classes.CarouselTranslate}>

            <ul
                className={classes.ItemsList}
                onMouseDown={controller.onMouseDown}
                onTouchStart={controller.onTouchStart}
                onTouchMove={controller.onTouchMove}
                onTouchEnd={controller.onTouchEnd}
                style={finalListStyle}
            >

                { useMemo(() => getItems(classes.Item, activeIndex), [items, activeIndex])  }

            </ul>

        </div>
            
    );
};

export default CarouselTranslate;
        