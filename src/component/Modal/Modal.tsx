import React, { ReactComponentElement } from 'react';
import classes from './Modal.module.scss';
import BackDrop from '../UI/BackDrop/BackDrop';
import CloseButton from '../UI/CloseButton/CloseButton';

export type ModalType = "CENTER" | "LEFT_TAB";

export const getModalClasses = (type: ModalType): string => {

    switch(type){

        case "CENTER": return [classes.Modal, classes["Modal--Center"]].join(' ');
        case "LEFT_TAB": return [classes.Modal, classes["Modal--LeftTab"]].join(' ');

        default: throw new Error("No implementation for modal type " + type);
    }
};

export const getCssTransform = (type: ModalType, show: boolean): string => {

    switch(type){

        case "CENTER": return show ? 'translateY(0)' : 'translateY(-100vh)';
        case "LEFT_TAB": return show ? 'translateX(0)' : 'translateX(-100vh)';

        default: throw new Error("No implementation for modal type " + type);
    }
};
        
interface ModalProps  {
    show: boolean,
    onClose: (event: any) => void | undefined,
    type: ModalType,
    children: any
}

const modal = ({show, onClose, type, children}: ModalProps) => {

    if(show === true)
        document.body.classList.add(classes.StopScrolling);
    else
        document.body.classList.remove(classes.StopScrolling);

    //modal class
    const modalClasses = getModalClasses(type);

    //modal transform
    const cssTransform = getCssTransform(type, show);

    console.log("render MOdal");

    return (
        
        <>
            <BackDrop show={show} backdropClickHandler={onClose} />

            <div
                className={modalClasses}
                style={{
                    transform: cssTransform,
                    opacity: show ? 1 : 0
                }}
            >

                <div 
                    className={classes.CloseButton}
                >
                    <CloseButton onClick={onClose}/>
                </div>

                { show && children }

            </div>
        </>
            
    );
};

export default modal;
        