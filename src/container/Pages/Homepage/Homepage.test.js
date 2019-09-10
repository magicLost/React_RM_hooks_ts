
import React from 'react';
import {
    render,
    fireEvent,
    cleanup,
    waitForElement,
    } from '@testing-library/react';
import { configure } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

import Homepage from "./Homepage";
import classes from './Homepage.module.scss';
import commonClasses from "./../../../commonClasses.module.scss";


describe("Homepage", () => {

    let _render = null;
    
    describe("Render and props test", () => {
    
        beforeEach(() => {
        
            _render = render(<Homepage />);
        
        });

        afterEach(cleanup)
    
        test("It must render one div.section and empty footer", () => {

            expect(document.querySelectorAll("header")).toHaveLength(1);

            expect(document.querySelectorAll("main")).toHaveLength(1);

            expect(document.querySelectorAll("main section")).toHaveLength(1);

            expect(document.querySelectorAll("main section")[0].style.display).toEqual("");

            expect(document.querySelectorAll("main section")[0].className).toEqual(classes.Section);

            //const nextBtn = _render.getByText('Prev');

            //fireEvent.click(nextBtn);

            //_render.debug();

            //const submitButton = _render.getByText('Отправить').parentElement;
            
            //expect(document.querySelectorAll("div")[0].classList.contains("." + classes.Section)).toEqual(true);

            //expect(document.querySelectorAll("." + classes.Section)).toHaveLength(3);
            
        });

        test("If we click on next btn - main section has display: none, portfolio section must appear", () => {

            const html = document.querySelector("html");

            html.scrollTop = 100;

            expect(html.scrollTop).toEqual(100);


            const nextBtn = _render.getByText('Prev');

            fireEvent.click(nextBtn);

            const mainSection = document.querySelectorAll("main section." + classes.Section)[0];

            const portfolioSection = document.querySelectorAll("main section." + classes.Section)[1];

            expect(mainSection.style.display).toEqual("none");

            expect(mainSection.className).toEqual(classes.Section);

            expect(portfolioSection).not.toEqual(undefined);

            expect(portfolioSection.className).toEqual(classes.Section + " " + commonClasses.AnimationMoveFromLeftToCenter);


            //fireEvent.scroll(html);

            expect(html.scrollTop).toEqual(0);
            
        });

        test("Each section has own scrollTop and when we switch sections it set scrollTop", () => {



        });

        test("Window.history", () => {


            
        });

    
    });

});

        