import React from 'react';
import classes from './MainContent.module.scss';
import { useCarouselTranslate } from '../../../../../hooks/Carousels/RCarousel/rcarousel';
import {clients, mainText} from "./../../../../../data/homepage_data";
import ListSvg from '../../../../../component/UI/ListSvg/ListSvg';
import MainPresentation from '../../../../MainPresentation/MainPresentation';
import TextRender from '../../../../../component/TextRender/TextRender';

        
/* interface MainContentProps  {
    
} */

const MainContent = React.memo(() => {

    console.log("render MainContent");

    return (
        
        <div className={classes.MainContent}>

            <MainPresentation />

            <TextRender textToParse={mainText}/>

            <div className={classes.Clients}>
                <ListSvg title={"Наши клиенты"} items={clients} typeSvg={"CLIENTS"} />
            </div>


        </div>
            
    );
});

export default MainContent;
        