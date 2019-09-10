import React, {useState} from 'react';
//import axios from 'axios';
//import { inputChangeAC, clearStateAC, setFormErrorAC } from './formAC';
import { FORM_ELEMENTS } from '../../data/forms';
import FeedbackController, { IFormController, FormController } from "../../container/Forms/Feedback/FeedbackController/FeedbackController";
import {IFormElementDesc} from "../../data/forms";
import FeedbackModel from '../../container/Forms/Feedback/FeedbackModel/FeedbackModel';
import FormValidatorChain from '../../helper/Validation/FormValidatorChain';
import {FORM_TYPE} from "./../../data/forms";

export interface IFormElementState {
    
    name: FORM_ELEMENTS;
    value: string;
    errors: string[];
    file?: File;
} 

export interface IFormState {

    formController: IFormController,

    formError: string,
    formMessage: string,
    formElementsState: IFormElementState[]
}

/* export enum FORM_ACTION {

    SET_FORM_ERROR,
    //SET_FORM_ELEMENTS,
    //SET_FORM_ELEMENT,
    CLEAR_STATE,
    INPUT_CHANGE
}; */

type useFormReturn = {

    controller: IFormController,

    formError: string,
    formMessage: string,
    formElementsState: IFormElementState[]
    setFormState: React.Dispatch<((prevState: IFormState) => IFormState) | IFormState> | null

};

//, formElementsStateInit: IFormElementState[]
export const useForm = (url: string, formElements: IFormElementDesc[], getInitState: () => IFormState) : useFormReturn => {

    const [formState, setFormState] = useState(getInitState);

    return {
        controller: formState.formController,
        formError: formState.formError,
        formMessage: formState.formMessage,
        formElementsState: formState.formElementsState,
        setFormState: setFormState
    };
        
};


export interface IFormRequest {

    isRequestSuccess: boolean,
    isRequestError: boolean,
    isRequestLoading: boolean
}

export const useFormRequest = () => {

    const initState: IFormRequest = {
        isRequestSuccess: false,
        isRequestError: false,
        isRequestLoading: false
    }

    const [requestState, setRequestState] = useState(initState);

    return {
        isRequestLoading: requestState.isRequestLoading,
        isRequestSuccess: requestState.isRequestSuccess,
        setRequestState: setRequestState
    }

}
