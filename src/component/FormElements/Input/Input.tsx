import React from 'react';

import classes from './Input.module.scss';
import {FormElementProps} from '../FormElementPropsInterface';

interface InputProps extends FormElementProps {
    error: string;
}

const Input = ({elementAttrs, value, labelValue, error, onChange, disabled = false }: InputProps) => {

    let inputClass = classes.Input;
    let errorElement = null;

    if(error){

        inputClass += ' ' + classes["Input--Error"];
        errorElement = (
            <div
                className={classes.Error}
            >
                <p>{error}</p>
            </div>
        );

    }

    return (

        <div className={classes.InputWrapper}>

            <label htmlFor={elementAttrs.id} className={classes.Label}>{labelValue}</label>

            <input
                className={inputClass}
                {...elementAttrs}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />

            {errorElement}

        </div>

    );
};

export default Input;
        