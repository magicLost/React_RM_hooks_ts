import React, { CSSProperties } from 'react';
import classes from './../Button/Button.module.scss';
import {BUTTON_TYPE} from './../Button/Button';
        
interface AnchorProps  {
    href: string;
    label: string;
    type: BUTTON_TYPE;
    style?: CSSProperties;
}

const anchor = ({href, label, type, style}: AnchorProps) => {

    let buttonClasses = classes.Button;

    switch(type){
        case "TEXT": buttonClasses += ' ' + classes["Button--Text"];break;
        case "OUTLINED": buttonClasses += ' ' + classes["Button--Outlined"];break;
        case "CONTAINED": buttonClasses += ' ' + classes["Button--Contained"];break;

        default:
            console.error("Bad anchor type " + type);
            buttonClasses += ' ' + classes["Button--Text"];
            break;
    }

    return (

        <a
            href={""}
            className={buttonClasses}
            style={style}
        >
            <span className={classes.Label}>{ label }</span>
        </a>
            
    );
};

export default anchor;
        