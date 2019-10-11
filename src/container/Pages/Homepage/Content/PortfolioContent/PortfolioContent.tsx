import React from 'react';
import classes from './PortfolioContent.module.scss';
import PortfolioSlider from '../../../../Slider/PortfolioSlider/PortfolioSlider';

        
interface PortfolioContentProps  {
    showFeedBackFormHandler: (id: string) => void | undefined;
}

//TODO: use useCallback for showFeedBackFormHandler
const PortfolioContent = ({showFeedBackFormHandler}: PortfolioContentProps) => {

    console.log("render PortfolioContent");

    return (
        
        <div className={classes.PortfolioContent}>

            <PortfolioSlider
                showFeedBackFormHandler={showFeedBackFormHandler}
            />


        </div>
            
    );
};

export default React.memo(PortfolioContent);
        