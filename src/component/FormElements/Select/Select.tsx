import React from 'react';
import classes from './Select.module.scss';
import {FormElementProps} from '../FormElementPropsInterface';
        
type Option = { value: string, label: string };

interface SelectProps extends FormElementProps  {
    options: Option[]
}

const select = ({elementAttrs, value, labelValue, onChange, options, disabled = false}: SelectProps) => {

    const getOptions = (options: Option[]) => {

        return options.map((option, index) => {

            //let selected = (value !== '') ? option.value === value : option.selected;

            return (
                <option
                    value={option.value}
                    key={option.value + index}
                >
                    { option.label }
                </option>
            );

        })

    };

    const optionsElements = getOptions(options);

    return (

        <div className={classes.SelectWrapper}>

            <label htmlFor={elementAttrs.id} className={classes.Label}>{labelValue}</label>

            <select
                className={classes.Select}
                onChange={onChange}
                {...elementAttrs}
                value={value}
                disabled={disabled}
            >

                { optionsElements }

            </select>

        </div>
            
    );

};

export default select;
        