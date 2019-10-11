
import React from 'react';
import {
    render,
    fireEvent,
    cleanup,
    waitForElement,
    } from '@testing-library/react';
import { configure } from '@testing-library/dom';
import '../Carousels/Carousel/CarouselOpacity/node_modules/@testing-library/jest-dom/extend-expect';

import MainPresentation from "./MainPresentation";
import classes from './MainPresentation.module.scss';


describe("MainPresentation", () => {

    let _render = null;
    
    describe("Render and props test", () => {
    
        beforeEach(() => {
        
            _render = render(<MainPresentation />);
        
        });

        afterEach(cleanup)
    
        describe("", () => {
    
            test("", () => {
            
                
            
            });
    
        });
    
    });

});

        