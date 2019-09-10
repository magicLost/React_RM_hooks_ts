import React, {useReducer} from 'react';
//import axios from 'axios';
import { inputChangeAC, clearStateAC, setFormErrorAC } from './formAC';
import { FORM_ELEMENTS } from '../../data/forms';


export interface IFormElementState {
    
    name: FORM_ELEMENTS;
    value: string;
    errors: string[];
    file?: File;
} 

export interface IFormState {
    formError: string,
    formElementsState: IFormElementState[]
}

export enum FORM_ACTION {

    SET_FORM_ERROR,
    //SET_FORM_ELEMENTS,
    //SET_FORM_ELEMENT,
    CLEAR_STATE,
    INPUT_CHANGE
};

type useFormReturn = {
    formElementsState: IFormElementState[],
    formError: string,
    formDispatch: React.Dispatch<any>
};

export const useForm = (formElementsState: IFormElementState[]) : useFormReturn => {

    const reducer = (state: IFormState, action: any) => {

        console.log(action.type);
        console.log(state);

        switch(action.type){
            
            case FORM_ACTION.SET_FORM_ERROR: return setFormErrorAC(state, action);
            case FORM_ACTION.CLEAR_STATE: return clearStateAC(state, action);
            case FORM_ACTION.INPUT_CHANGE: return inputChangeAC(state, action);

            default: return state;
        }

    };

    const result = useReducer(reducer, {
        formError: '',
        formElementsState: formElementsState /* [
            { name: FORM_ELEMENTS.NAME, value: '', error: ''},
            { name: FORM_ELEMENTS.PHONE, value: '', error: ''},
            { name: FORM_ELEMENTS.EMAIL, value: '', error: ''},
            { name: FORM_ELEMENTS.COMMENT, value: '', error: ''}
        ] */
    });

    const state: IFormState = result[0];
    const dispatch = result[1];

    return {
        formElementsState: state.formElementsState,
        formError: state.formError,
        formDispatch: dispatch
    };
        
}


export enum REQUEST_ACTION{

    REQUEST_START,
    REQUEST_SERVER_ERROR,
    REQUEST_FORM_ERROR,
    REQUEST_SUCCESS,

};

interface IFormRequestState {
    isRequestSuccess: boolean,
    isRequestError: boolean,
    isRequestLoading: boolean
}


export const useFormRequest = () => {

    const initState: IFormRequestState = {

        isRequestSuccess: false,
        isRequestError: false,
        isRequestLoading: false

    };

    const reducer = (state: IFormRequestState, action: any) => {

        console.log(action.type);
        console.log(state);

        switch(action.type){

            case REQUEST_ACTION.REQUEST_START: return {
                isRequestLoading: true,
                isRequestError: false,
                isRequestSuccess: false,
            };
            case REQUEST_ACTION.REQUEST_SERVER_ERROR: return {
                isRequestLoading: false,
                isRequestError: true,
                isRequestSuccess: false
            };
            case REQUEST_ACTION.REQUEST_FORM_ERROR: return {
                isRequestLoading: false,
                isRequestError: false,
                isRequestSuccess: false,
            };
            case REQUEST_ACTION.REQUEST_SUCCESS: return {
                isRequestLoading: false,
                isRequestError: false,
                isRequestSuccess: true
            };

            default: return state;
        }

    };

    const [state, requestDispatch] = useReducer(reducer, initState);

    return {
        requestState: state,
        requestDispatch: requestDispatch
    }; 


};

/* export const useFeedBackForm = (formElementsStateInit: IFormElementState[]) => {

    //console.log("formInitState", formInitState);

    const {formElementsState, formError, formDispatch} : useFormReturn = useForm(formElementsStateInit);
    const {requestState, requestDispatch} = useFormRequest();

    const postRequest = (url: string, formData: FormData) => {

        formDispatch({type: formActions.SET_FORM_ERROR, formError: ''});
        requestDispatch({type: requestActions.REQUEST_START});

        axios({
            method: "post",
            url: url,
            data: formData ,
            headers: {'Content-Type': 'multipart/form-data'},
        })
            .then( response => {

                if(response.data.result && response.data.result === 'success'){
                    requestDispatch({type: requestActions.REQUEST_SUCCESS});
                }else{
                    formDispatch({type: formActions.SET_FORM_ERROR, formError: response.data.error});
                    requestDispatch({type: requestActions.REQUEST_FORM_ERROR});
                }
            })
            .catch( error => {
                requestDispatch({type: requestActions.REQUEST_SERVER_ERROR});
            });

    };

    return [
        formState, 
        formDispatch,

        requestState,
        postRequest
    ]; 

}; */
