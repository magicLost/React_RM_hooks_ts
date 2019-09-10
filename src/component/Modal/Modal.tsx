import React, { ReactComponentElement } from 'react';
import classes from './Modal.module.scss';
import BackDrop from '../UI/BackDrop/BackDrop';
import CloseButton from '../UI/CloseButton/CloseButton';

        
interface ModalProps  {
    show: boolean;
    backdropClickHandler: (event: any) => void | undefined;
    children: any
}

const modal = ({show, backdropClickHandler, children}: ModalProps) => {
    return (
        
        <>
        <BackDrop show={show} backdropClickHandler={backdropClickHandler} />
        
        <div 
            className={classes.CloseButton}
            style={{
                transform: show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: show ? 1 : 0
            }}
        >
            <CloseButton onClick={backdropClickHandler}/>
        </div>

        <div
            className={classes.Modal}
            style={{
                transform: show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: show ? 1 : 0
            }}
        >

            { show && children }

        </div>
    </>
            
    );
};

export default modal;
        