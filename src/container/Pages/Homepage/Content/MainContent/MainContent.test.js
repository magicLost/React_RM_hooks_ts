
import React from 'react';
import {
    render,
    fireEvent,
    cleanup,
    waitForElement,
    } from '@testing-library/react';
import { configure } from '@testing-library/dom';
import '../../../../Carousels/Carousel/CarouselOpacity/node_modules/@testing-library/jest-dom/extend-expect';

import MainContent from "./MainContent";
import classes from './MainContent.module.scss';


describe("MainContent", () => {

    let _render = null;
    
    describe("Render and props test", () => {
    
        beforeEach(() => {
        
            _render = render(<MainContent />);
        
        });

        afterEach(cleanup)
    
        describe("", () => {
    
            test("", () => {
            
                
            
            });
    
        });
    
    });

});

        