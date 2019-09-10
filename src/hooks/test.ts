/* import React, {useReducer} from 'react';

interface IFormElementState {
    
    value: string;
    error: string;
    fileList?: any;
} 

export interface IFormElementsState {

    name: IFormElementState,
    email: IFormElementState,
    phone: IFormElementState,
    comment: IFormElementState

}

export interface IFormState {
    formError: string,
    formElementsState: IFormElementsState
}

export enum FORM_ACTION {

    SET_FORM_ERROR,
    //SET_FORM_ELEMENTS,
    //SET_FORM_ELEMENT,
    CLEAR_STATE,
    INPUT_CHANGE
};

type useFormReturn = {
    formElementsState: IFormElementsState,
    formError: string,
    dispatch: React.Dispatch<any>
};

const setFormErrorAC = (state, action) => {

};

export const useTest = () => {

    const reducer = (state: IFormState, action: any) => {

        console.log(action.type);
        console.log(state);

        switch(action.type){
            
            case FORM_ACTION.SET_FORM_ERROR: return setFormErrorAC(state, action);


            default: return state;
        }

    };

    const result = useReducer(reducer, {
        formError: '',
        formElementsState: {
            name: { value: '', error: ''},
            phone: { value: '', error: ''},
            email: { value: '', error: ''},
            comment: { value: '', error: ''}
        }
    });

    const state: IFormState = result[0];
    const dispatch = result[1];

    return {
        formElementsState: state.formElementsState,
        formError: state.formError,
        dispatch: dispatch
    };
        
} */