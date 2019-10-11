
import React from 'react';
import {
    render,
    fireEvent,
    cleanup,
    waitForElement,
    } from '@testing-library/react';
import { configure } from '@testing-library/dom';
import '../../Carousels/Carousel/CarouselOpacity/node_modules/@testing-library/jest-dom/extend-expect';

import RCarouselTranslate from "./RCarouselTranslate";
import classes from './RCarouselTranslate.module.scss';


describe("RCarouselTranslate", () => {

    let _render = null;
    
    describe("Render and props test", () => {
    
        beforeEach(() => {
        
            _render = render(<RCarouselTranslate />);
        
        });

        afterEach(cleanup)
    
        describe("", () => {
    
            test("", () => {
            
                
            
            });
    
        });
    
    });

});

        