import React, {useMemo} from 'react';
import classes from './PortfolioSlider.module.scss';
import { usePortfolioSlider } from '../../../hooks/Slider/portfolioSlider';
import {photos, icons, categories} from "../../../data/portfolio_data";
import ImgWithLoading from '../../../component/UI/ImgWithLoading/ImgWithLoading';
import RCarouselOpacity, {GetItemStyle, GetItems as GetCarouselItems} from '../../Carousels/RCarousel/RCarouselOpacity/RCarouselOpacity';
//import Scroller, {GetItems as GetScrollerItems} from '../../Scrollers/Scroller/Scroller';
import ArrowControls from '../../../component/ArrowControls/ArrowControls';
import ControlsFeature from '../../ControlsFeature/ControlsFeature';
import Button from '../../../component/UI/Button/Button';
//import RScroller, {GetScrollerItems} from '../../Scrollers/RScroller/RScroller';
import Scroller, {GetScrollerItems} from '../../Scrollers/Scroller/Scroller';

        
interface PortfolioSliderProps  {
    //categories: any[],
    //icons: any[],
    //photos: any[],
    showFeedBackFormHandler: (id: string) => void | undefined
}

const PortfolioSlider = ({showFeedBackFormHandler}: PortfolioSliderProps) => {

    const {
        categoryIndex, 
        photoIndex, 
        opacity, 
        isTranslated,
        carouselController,
        dispatch
    } = usePortfolioSlider(photos, categories.length);

    const setCategoryIndexToState = (index: number) => {

        carouselController.onSetIndex(0);
        dispatch({type: "SET_CATEGORY_INDEX", index: index});
    };

    const onScrollerItemClick = (target: any) => {

        console.log("onScrollerItemClick", target);

        if(target && target.dataset && target.dataset.index){

            carouselController.onSetIndex(parseInt(target.dataset.index));

        }

    };

    const getCarouselItems: GetCarouselItems = (
        itemClass: string, 
        getItemStyle: GetItemStyle, 
        //isTranslated: boolean, 
        //opacity: number, 
        activeIndex: number
        ) => {

        console.log("getCarouselItems");

        return photos[categoryIndex].size300.map((value, index) => {

            let style = getItemStyle(index);

            return (

                <li
                    key={itemClass + index}
                    className={itemClass}
                    style={style}
                >

                    <div className={classes.CarouselPhotoItem}>
                        <ImgWithLoading
                            alt={"Пример нашей работы."}
                            isActive={ index === activeIndex }
                            src={photos[categoryIndex].size300[index]}
                            srcSets={[
                                { media: "(min-width: 700px)", srcSet: photos[categoryIndex].size600[index]}
                            ]}
                        />
                    </div>

                </li>

            );

        });

    };

    const getScrollerItems: GetScrollerItems = (itemClass, onItemClick, numberOfActiveItems, itemRef) => {

        console.log("get scroller items");
        return photos[categoryIndex].size300.map((value, index: number) => {

            //console.log("get scroller items", itemRef);
            //let isActive = ( index + 1 ) <= numberOfActiveItems;

            let style = {
                backgroundImage: 'url(' + icons[categoryIndex] + ")",
                backgroundPosition: _getBGPosition(index, 100)
            };
    
            return (
                <li
                    key={itemClass + index}
                    className={itemClass}
                    ref={index === 0 ? itemRef : undefined}
                    data-index={index}
                >
                      <div
                        className={classes.Wrapper}
                        data-index={index}
                    >
                        <div
                            className={classes.Content}
                            data-index={index}
                            style={style}
                            onClick={onItemClick}
                        >
                        </div>
                    </div>
                </li>
            );
        });


    };

    const getDescription = () => {

        const desc = photos[categoryIndex].photosDesc[photoIndex];

        return (

            <div className={classes.Description}>

                <h4 className={classes.Title}>{ desc.title }</h4>

                <p className={classes.Text}>
                    { desc.text }
                </p>

                <p className={classes.Price}>
                    Примерная стоимость: { desc.price }
                </p>

                <Button 
                    type={"TEXT"} 
                    label={"Хочу такую"} 
                    onClick={(event: any) => {showFeedBackFormHandler(desc.id)}
                } />

            </div>

        );

    };

    const _getBGPosition = (index: number, offset: number) => {

        let multi = Math.floor(index / 3);

        return "-" + ((index - 3 * multi) * offset) + "px -" + offset * multi + 'px';

    };

    console.log("Portfolio slider render");

    return (
        
        <div className={classes.PortfolioSlider}>

            <h3 className={classes.MainTitle}>Наши работы.</h3>

            <div className={classes.CarouselWrapper}>
                { useMemo(() => (
                    <div className={classes.Carousel}>

                        <RCarouselOpacity
                            items={photos[categoryIndex].size300}
                            getItems={getCarouselItems}
                            activeIndex={photoIndex}
                            opacity={opacity}
                            isTranslated={isTranslated}
                            controller={carouselController}
                        />

                    </div>
                  ), [photoIndex, categoryIndex, opacity])
                }

                { useMemo(() => (
                    <div className={classes.Arrows}>
                        <ArrowControls
                            increaseActiveIndex={carouselController.onIncreaseIndex}
                            decreaseActiveIndex={carouselController.onDecreaseIndex}
                            activeIndex={photoIndex}
                            length={photos[categoryIndex].size300.length}
                            arrowSizeClass={classes.ArrowsSize}
                        />
                    </div>
                  ), [photoIndex, categoryIndex])
                }
            </div>

            { useMemo(() => (
                <div className={classes.Controls}>

                    <ControlsFeature
                        itemClickHandler={setCategoryIndexToState}
                        items={categories}
                        config={{
                            type: "SVG",
                            formType: "CIRCLE",
                            isShowTitle: true,
                            isMainItemText: false,
                            mainDivStyle: { top: "30px" },
                            mainItemStyle: { backgroundColor: "white" }
                        }}
                    />

                </div>
            ), []) }

            { useMemo(() => (
                <div className={classes.Scroller}>

                    <Scroller
                        items={photos[categoryIndex].size300}
                        getItems={getScrollerItems}
                        itemClickHandler={onScrollerItemClick}
                    /> 

                </div>
            ), [categoryIndex])}

            { useMemo(() => getDescription(), [categoryIndex, photoIndex]) }

        </div>
            
    );
};

export default PortfolioSlider;
        