import React from 'react';
import classes from './CloseButton.module.scss';
        
interface CloseButtonProps  {
    onClick: (event: any) => void | undefined;
}

const closeButton = ({onClick}: CloseButtonProps) => {

    return (
        
        <button className={classes.CloseButton} onClick={onClick}>

            <span className={classes.LeftRight}></span>
            <span className={classes.RightLeft}></span>
            {/* <label className={classes.Label}>close</label> */}

        </button>
            
    );
};

export default closeButton;
        