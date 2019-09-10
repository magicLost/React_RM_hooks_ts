import React from 'react';
import {
    render,
    fireEvent,
    cleanup,
    waitForElement,
    } from '@testing-library/react';
import { configure } from '@testing-library/dom';

import '@testing-library/jest-dom/extend-expect';

import CallMeForm from "./CallMeForm";
import {callMeElements} from "./../../../../data/forms";
//import classes from './CallMeForm.module.scss';

const formElementsState = [

    {
        name: 'name',
        value: 'name123',
        errors: ['Bad name']
    },

    {
        name: 'phone',
        value: 'phone123',
        errors: ["Bad phone"]
    }

];
describe("CallMeForm", () => {

    let _render = null;
    const onChange = jest.fn();
    const onSubmit = jest.fn();
    const onClear = jest.fn();
    
    describe("Render and props test", () => {
    
        beforeEach(() => {
        
            _render = render(<CallMeForm
                formElements={callMeElements}
                formError='Bad fat error'
                formElementsState={formElementsState}
                onChange={onChange}
                onSubmit={onSubmit}
                onClear={onClear}
                isLoading={false}
            />);
        
        });

        afterEach(cleanup)
    
        describe("", () => {
    
            test("It must render input element, phone element", () => {
            
                const nameInput = _render.getByLabelText('Ваше имя');
                const nameInputError = _render.getByText('Bad name');
    
                const phoneInput = _render.getByLabelText('Ваш номер телефона');
                const phoneInputError = _render.getByText('Bad phone');
    
    
                expect(nameInput.value).toEqual("name123");
                expect(phoneInput.value).toEqual("phone123");
            
            });

            test("Call onChange, onSubmit, onClear mock functions", () => {
    
                const nameInput = _render.getByLabelText('Ваше имя');
                const phoneInput = _render.getByLabelText('Ваш номер телефона');
    
                const clearButton = _render.getByText('Очистить');
                const submitButton = _render.getByText('Отправить');
                //expect(clearButton).toHaveLength(1);
    
                fireEvent.click(clearButton);
                fireEvent.click(submitButton);
    
                fireEvent.change(nameInput, { target: { value: "second" } });
                fireEvent.change(phoneInput, { target: { value: "second" } });
    
                expect(onClear).toBeCalledTimes(1);
                expect(onSubmit).toBeCalledTimes(1);
                expect(onChange).toBeCalledTimes(2);
            
    
            });
    
        });
    
    }); 

});

        