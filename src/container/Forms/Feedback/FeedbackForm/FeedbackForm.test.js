
import React from 'react';
import {
    render,
    fireEvent,
    cleanup,
    waitForElement,
    } from '@testing-library/react';
import { configure } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';


import FeedbackForm from "./FeedbackForm";
import classes from './FeedbackForm.module.scss';

import {feedbackElements} from "./../../../../data/forms";

/* export interface IFormElementState {
    
    name: FORM_ELEMENTS;
    value: string;
    errors: string[];
    file?: File;
} 
 */
const formElementsState = [
    {
        name: 'name',
        value: 'name123',
        errors: ['Bad name']
    },
    {
        name: 'email',
        value: 'email123',
        errors: ["Bad email"]
    },
    {
        name: 'phone',
        value: 'phone123',
        errors: ["Bad phone"]
    } ,
    {
        name: 'comment',
        value: 'comment123',
        errors: ["Bad comment"]
    } 
];

describe("FeedbackForm", () => {

    let _render = null;
    const onChange = jest.fn();
    const onSubmit = jest.fn();
    const onClear = jest.fn();
    
    describe("Render and props test", () => {
    
        describe("Init Props", () => {

            beforeEach(() => {
        
                //formElements, formError, formElementsState, onChange, onSubmit, onClear, isLoading = false
                _render = render(<FeedbackForm
                        formElements={feedbackElements}
                        formError='Bad fat error'
                        formElementsState={formElementsState}
                        onChange={onChange}
                        onSubmit={onSubmit}
                        onClear={onClear}
                        isLoading={false}
                    />);
            
            });
    
            afterEach(cleanup)
    
            test("Form render name input, email input, phone input, comment textarea their values and error messages", () => {
    
                const nameInput = _render.getByLabelText('Ваше имя');
                const nameInputError = _render.getByText('Bad name');
    
                const phoneInput = _render.getByLabelText('Ваш номер телефона');
                const phoneInputError = _render.getByText('Bad phone');
    
                const emailInput = _render.getByLabelText('Ваш электронный адрес');
                const emailInputError = _render.getByText('Bad email');
    
                const commentTextarea = _render.getByLabelText('Ваш комментарий');
    
                expect(nameInput.value).toEqual("name123");
                expect(phoneInput.value).toEqual("phone123");
                expect(emailInput.value).toEqual("email123");
                expect(commentTextarea.value).toEqual("comment123");
    
            });
    
            test("If formError !== '', we must see error message", () => {
                
                const formError = _render.getByText('Bad fat error');
    
                
            });
    
            test("Call onChange, onSubmit, onClear mock functions", () => {
    
                const nameInput = _render.getByLabelText('Ваше имя');
                const phoneInput = _render.getByLabelText('Ваш номер телефона');
                const emailInput = _render.getByLabelText('Ваш электронный адрес');
                const commentTextarea = _render.getByLabelText('Ваш комментарий');
    
                const clearButton = _render.getByText('Очистить');
                const submitButton = _render.getByText('Отправить');
                //expect(clearButton).toHaveLength(1);
    
                fireEvent.click(clearButton);
                fireEvent.click(submitButton);
    
                fireEvent.change(nameInput, { target: { value: "second" } });
                fireEvent.change(phoneInput, { target: { value: "second" } });
                fireEvent.change(emailInput, { target: { value: "second" } });
                fireEvent.change(commentTextarea, { target: { value: "second" } });
    
                expect(onClear).toBeCalledTimes(1);
                expect(onSubmit).toBeCalledTimes(1);
                expect(onChange).toBeCalledTimes(4);
            
    
            });
        

        });

        describe("Changed props", () => {

            /* beforeEach(() => {
        
                //formElements, formError, formElementsState, onChange, onSubmit, onClear, isLoading = false
               
            
            }); */
    
            afterEach(cleanup)

            test("If isLoading - true, all elements must be disabled", () => {
    
                _render = render(<FeedbackForm
                    formElements={feedbackElements}
                    formError='Bad fat error'
                    formElementsState={formElementsState}
                    onChange={onChange}
                    onSubmit={onSubmit}
                    onClear={onClear}
                    isLoading={true}
                />);

                const nameInput = _render.getByLabelText('Ваше имя');
                const phoneInput = _render.getByLabelText('Ваш номер телефона');
                const emailInput = _render.getByLabelText('Ваш электронный адрес');
                const commentTextarea = _render.getByLabelText('Ваш комментарий');
                const clearButton = _render.getByText('Очистить').parentElement;
                const submitButton = _render.getByText('...Подождите').parentElement;


                expect(nameInput.disabled).toEqual(true);
                expect(phoneInput.disabled).toEqual(true);
                expect(emailInput.disabled).toEqual(true);
                expect(commentTextarea.disabled).toEqual(true);
                expect(clearButton.disabled).toEqual(true);
                expect(submitButton.disabled).toEqual(true);

                //const clearButton = _render.getAllByText('Очистить');
                //expect(clearButton).toHaveLength(1);
                
            });

        })

    });

});

        