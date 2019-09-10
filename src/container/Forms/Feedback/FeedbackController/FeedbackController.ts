import React from 'react';
import axios from 'axios';

import {IFormModel, IFeedbackModel} from "./../../interfaces";
import {IValidatorDesc, IFormElementDesc} from './../../../../data/forms';
import {IFormElementState, IFormState} from "../../../../hooks/Form/form"
import {IRequestState} from "./../../../../hooks/request";
import FeedbackModel from "./../FeedbackModel/FeedbackModel";


/* interface InputChangeAction {
    type: FORM_ACTION,
    formElementState: IFormElementState
} */

type Result = "SUCCESS" | "ERROR";

interface ResponseData{

    result: Result;
    error?: string;

}

export interface IFormController {

    formElements: IFormElementDesc[];
    model: IFormModel;

    //formState: IFormState;
    setFormState: React.Dispatch<((prevState: IFormState) => IFormState) | IFormState> | null;
    //formDispatch: React.Dispatch<any> | null;
    
    onClear: (event: any) => void | undefined;
    onSubmit: (event: any) => void | undefined;
    onChange: (event: any) => void | undefined;

    //inputChangeAC(state: IFormState, action: InputChangeAction): IFormState;
    //clearStateAC(state: IFormState, action: any): IFormState;
    //setFormErrorAC(state: IFormState, action: any): IFormState;

    //onClearHandler(): void | undefined;
    //onSubmitHandler(): void | undefined;
    //onChangeHandler(): void | undefined;

}

//type FormStateDispatch  = string | ((prevState: IFormState) => IFormState);



export abstract class FormController implements IFormController{

    formElements: IFormElementDesc[];
    model: IFormModel;

    //formDispatch: React.Dispatch<any> | null = null;
    //formState: IFormState = { formError: '', formElementsState: []};
    setFormState: React.Dispatch<((prevState: IFormState) => IFormState) | IFormState> | null = null;

    constructor(formElements: IFormElementDesc[], model: IFormModel){
        this.formElements = formElements;
        this.model = model;
    }

    abstract onClear: (event: any) => void | undefined;
    abstract onSubmit: (event: any) => void | undefined;
    abstract onChange: (event: any) => void | undefined;

    /* inputChangeAC(state: IFormState, action: InputChangeAction): IFormState{

        const newState: IFormState = {formError: '' , formElementsState: []};

        for(let element of state.formElementsState){
            if(element.name === action.formElementState.name){
                newState.formElementsState.push(action.formElementState);
            }else{
                newState.formElementsState.push(element);
            }
        }

        return newState;

    } */

    /* setFormErrorAC(state: IFormState, action: any): IFormState{

        return { formError: action.formError, formElementsState: {...state.formElementsState}};

    } */

    /* clearStateAC(state: IFormState, action: any): IFormState{

        const formElementsState = this.model.getFormElementsInitState(this.formElements);

        return {formError: '', formElementsState: formElementsState};
    } */

    protected abstract onSubmitHandler(): void | undefined;
    protected onChangeHandler(target: any): void | undefined{

        if(this.setFormState === null) throw new Error("No setFormState...");

        //const validatorsDesc: IValidatorDesc[] | undefined = this.model.getValidatorsDesc(this.formElements);

        const formElementState = this.model.inputValidation(target, this.formElements);

        /* this.formDispatch({
            type: FORM_ACTION.INPUT_CHANGE,
            formElementState: formElementState
        }); */

        this.setFormState((prevState: IFormState) => {

            const newFormElementsState: IFormElementState[] = [];

            for(let element of prevState.formElementsState){
                if(element.name === formElementState.name){
                    newFormElementsState.push(formElementState);
                }else{
                    newFormElementsState.push(element);
                }
            }

            return { formController: prevState.formController, formError: '', formMessage: '', formElementsState: newFormElementsState};

        });

    }

    protected onClearHandler(): void | undefined {

        if(this.setFormState === null) throw new Error("No setFormState...");

        this.setFormState((prevState: IFormState) => {

            const formElementsState = this.model.getFormElementsInitState(this.formElements);

            return { formController: prevState.formController, formError: '',  formMessage: '', formElementsState: formElementsState};

        });

    }

}

class FeedbackController extends FormController {

    url = '';
    setRequestState: React.Dispatch<((prevState: IRequestState) => IRequestState) | IRequestState> | null = null;

    constructor(formElements: IFormElementDesc[], model: FeedbackModel, url: string){

        super(formElements, model);
        this.url = url;
    }
    
    onClear = (event: any) => {

        event.preventDefault();
        event.stopPropagation();

        this.onClearHandler();

        if(this.setRequestState === null) throw new Error("No setRequestState...");

        this.setRequestState((prevState: IRequestState) => {

            return { 
                isRequestSuccess: false,
                isRequestError: false,
                isRequestLoading: false
            };

        });


    };

    onChange = (event: any) => {

        event.preventDefault();
        event.stopPropagation();

        this.onChangeHandler(event.target);
    };

    onSubmit = (event: any): void | undefined => {

        event.preventDefault();
        event.stopPropagation();

        this.onSubmitHandler();

    }

    protected onSubmitHandler(): void | undefined {

        if(this.setFormState === null) throw new Error("No setFormState...");

        this.setFormState((prevState: IFormState) => {

            if(this.model.hasInputsError(prevState.formElementsState, prevState.formError)) return prevState;

            const formError = this.model.validateOnSubmit(prevState.formElementsState);

            if(!formError){

                const formData = this.model.getFormData(prevState.formElementsState);

                const token = (<IFeedbackModel>this.model).createToken(prevState.formElementsState);

                formData.append('token', token);

                this.postRequest(formData);
    
            }else{
    
                return { formController: prevState.formController, formError: formError, formMessage: '', formElementsState: prevState.formElementsState };
    
            }

            return prevState;

        });

    }

    protected postRequest(formData: FormData): void | undefined {

        if(this.setFormState === null) throw new Error("No setFormState...");

        if(this.setRequestState === null) throw new Error("No setRequestState...");

        //formDispatch({type: formActions.SET_FORM_ERROR, formError: ''});
        this.setFormState(prevState => {

            if(prevState.formError !== '')
                return { ...prevState, formError: '' };

            return prevState;
        })

        this.setRequestState({
            isRequestSuccess: false,
            isRequestError: false,
            isRequestLoading: true
        });
        //requestDispatch({type: requestActions.REQUEST_START});

        axios({
            method: "post",
            url: this.url,
            data: formData ,
            headers: {'Content-Type': 'multipart/form-data'},
        })
            .then( response => {

                if(this.setFormState === null) throw new Error("No setFormState...");

                if(this.setRequestState === null) throw new Error("No setRequestState...");

                if(response.data.result && response.data.result === "SUCCESS"){

                    //if(this.setRequestState === null) throw new Error("No setRequestState...");
                    this.setFormState(prevState => {

                        return { ...prevState, formError: '', formMessage: 'Мы получили вашу заявку и свяжемся с вами в течение 15 минут.' };
                    });

                    this.setRequestState({
                        isRequestSuccess: true,
                        isRequestError: false,
                        isRequestLoading: false
                    });
                }else if(response.data.result && response.data.result === "ERROR"){

                    this.setFormState(prevState => {

                        return { ...prevState, formError: response.data.error, formMessage: '' };
                    });

                    this.setRequestState({
                        isRequestSuccess: false,
                        isRequestError: false,
                        isRequestLoading: false
                    });
                }else{
                    throw new Error("Bad result data result? - " + response.data.result);
                }
            })
            .catch( error => {

                if(this.setRequestState === null) throw new Error("No setRequestState...");
                if(this.setFormState === null) throw new Error("No setFormState...");

                this.setFormState(prevState => {

                    return { ...prevState, formError: "Сервер не хочет отвечать.", formMessage: '' };
                });

                this.setRequestState({
                    isRequestSuccess: false,
                    isRequestError: true,
                    isRequestLoading: false
                });
            }); 

    }

}

export default FeedbackController;