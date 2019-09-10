import React from 'react';
import classes from './CloseButton.module.scss';
        
interface CloseButtonProps  {
    onClick: (event: any) => void | undefined;
}

const closeButton = ({onClick}: CloseButtonProps) => {

    return (
        
        <div className={classes.CloseButton} onClick={onClick}>

            <div className={classes.LeftRight}></div>
            <div className={classes.RightLeft}></div>
            {/* <label className={classes.Label}>close</label> */}

        </div>
            
    );
};

export default closeButton;
        