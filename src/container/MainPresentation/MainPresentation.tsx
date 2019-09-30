import React, {useState, useMemo} from 'react';
import classes from './MainPresentation.module.scss';
import {mainPresentationCarouselItems, mainPresentationItemsControls} from "./../../data/homepage_data";
import Anchor from '../../component/UI/Anchor/Anchor';
import CarouselTranslate from '../Carousel/CarouselTranslate/CarouselTranslate';
import ArrowControls from '../../component/ArrowControls/ArrowControls';
import ControlsFeature from '../ControlsFeature/ControlsFeature';


interface MainPresentationProps  {
    
}

const MainPresentation = ({}: MainPresentationProps) => {

    const [ activeIndex, setActiveIndex ] = useState(0);

    const carouselItemsLength = mainPresentationCarouselItems.length;

    const increaseActiveIndex = () => {

        //console.log("increaseActiveIndex");
        setActiveIndex(prevIndex => prevIndex < (carouselItemsLength - 1) ? prevIndex + 1 : prevIndex);
        /* if(activeIndex < carouselItemsLength - 1){

            setActiveIndex(activeIndex + 1);

        } */
    };

    const decreaseActiveIndex = () => {

        //console.log("decreaseActiveIndex");
        //console.log("decreaseCarouselIndex", carouselActiveIndex)
    
        setActiveIndex(prevIndex => prevIndex > 0 ? prevIndex - 1 : prevIndex);
        /* if(activeIndex > 0){

            setActiveIndex(activeIndex - 1);

        } */
    };

    const setActiveIndexToState = (index: number) => {

        //console.log("setActiveIndex", index, activeIndex);

        if(index >= 0 && index <= carouselItemsLength - 1){

                
            setActiveIndex(index);

        }
    };

    const getCarouselItems = (
        itemClass: string, 
        activeIndex: number): JSX.Element[] => 
    {

        console.log("CarouselTranslate getItems");

        return mainPresentationCarouselItems.map((item, index) => {

            //return getItem(index, 0, itemClass);
            //console.log("item");

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

            { useMemo(() => (
                <CarouselTranslate
                    items={mainPresentationCarouselItems}
                    activeIndex={activeIndex}
                    increaseActiveIndex={increaseActiveIndex}
                    decreaseActiveIndex={decreaseActiveIndex}
                    getItems={getCarouselItems}
                />
            ), [activeIndex]) }

            <div className={classes.Arrows}>

                { useMemo(() => (
                    <ArrowControls
                        increaseActiveIndex={increaseActiveIndex}
                        decreaseActiveIndex={decreaseActiveIndex}
                        activeIndex={activeIndex}
                        length={carouselItemsLength}
                        arrowSizeClass={classes.ArrowsSize}
                    />
                ), [activeIndex]) }

            </div>

            
            <div className={classes.MobileControls}>
                { useMemo(() => (
                    <ControlsFeature
                        itemClickHandler={setActiveIndexToState}
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
        