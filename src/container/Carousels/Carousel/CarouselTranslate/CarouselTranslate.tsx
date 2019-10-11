import React, {useMemo} from 'react';
import classes from './CarouselTranslate.module.scss';
import { useCarouselTranslate } from '../../../../hooks/Carousels/Carousel/carousel';
        
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

    const finalTranslateX = controller.calc.getTranslateX(activeIndex, translateX);

    const finalListStyle = {
        ...listStyle,
        transform: 'translateX(' + finalTranslateX + ')'
    };

    console.log("render carouselTranslate", translateX, finalTranslateX, activeIndex);

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

                { useMemo(() => getItems(classes.Item, activeIndex), [items])  }

            </ul>

        </div>
            
    );
};

export default CarouselTranslate;
        