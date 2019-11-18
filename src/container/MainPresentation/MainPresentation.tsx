import React, {useState, useMemo} from 'react';
import classes from './MainPresentation.module.scss';
import {mainPresentationCarouselItems, mainPresentationItemsControls} from "./../../data/homepage_data";
import Anchor from '../../component/UI/Anchor/Anchor';
import ArrowControls from '../../component/ArrowControls/ArrowControls';
import ControlsFeature from '../ControlsFeature/ControlsFeature';
import RCarouselTranslate from '../Carousels/RCarousel/RCarouselTranslate/RCarouselTranslate';
import { useCarouselTranslate } from '../../hooks/Carousels/RCarousel/rcarousel';



interface MainPresentationProps  {
    
}

const MainPresentation = ({}: MainPresentationProps) => {


    const {translateX, activeIndex, isTranslated, controller} = useCarouselTranslate(mainPresentationCarouselItems.length);

    const carouselItemsLength = mainPresentationCarouselItems.length;

    /* const increaseActiveIndex = () => {

        dispatch({type: "INCREASE_INDEX"});
    };

    const decreaseActiveIndex = () => {

        dispatch({type: "DECREASE_INDEX"});
    };

    const setActiveIndexToState = (index: number) => {

        dispatch({type: "SET_INDEX", index: index});
    };
 */
    /* RENDER */
    const getCarouselItems = (
        itemClass: string, 
        activeIndex: number): JSX.Element[] => 
    {

        console.log("CarouselTranslate getItems");

        return mainPresentationCarouselItems.map((item, index) => {

            return (

                <li key={itemClass + index} className={itemClass}>
                    <div className={classes.Content}>

                        <h3>{ item.title }</h3>
                        <p className={classes.Paragraph}>{ item.desc }</p>
                        <Anchor label={"Подробнее"} href={item.href} type={"OUTLINED"}/>

                    </div>
                </li>

            ); 

        });

    }

    console.log("render MainPresentation");

    return (
        
        <div className={classes.MainPresentation}>

            {useMemo(() => ( 
                <RCarouselTranslate 
                    items={mainPresentationCarouselItems}
                    getItems={getCarouselItems}
                    activeIndex={activeIndex}
                    translateX={translateX}
                    isTranslated={isTranslated}
                    controller={controller}
                />
            ),[translateX, activeIndex, isTranslated])}

            <div className={classes.Arrows}>
                { useMemo(() => (
                    <ArrowControls
                        increaseActiveIndex={controller.onIncreaseIndex}
                        decreaseActiveIndex={controller.onDecreaseIndex}
                        activeIndex={activeIndex}
                        length={carouselItemsLength}
                        arrowSizeClass={classes.ArrowsSize}
                    />
                ), [activeIndex]) }
            </div>

            
            <div className={classes.MobileControls}>
                { useMemo(() => (
                    <ControlsFeature
                        itemClickHandler={controller.onSetIndex}
                        items={mainPresentationItemsControls}
                        config={{
                            type: "SVG",
                            formType: "CIRCLE",
                            isShowTitle: true,
                            isMainItemText: false,
                            mainDivStyle: { top: "-40px" },
                            mainItemStyle: { backgroundColor: "#fafafa" }
                        }}
                    />
                ), [])}
            </div>

        </div>
            
    );
};

export default MainPresentation;
        