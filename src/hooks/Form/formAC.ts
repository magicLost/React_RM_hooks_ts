import {ActionCreator} from "../../container/Forms/interfaces";
import {IFormState, FORM_ACTION} from "./form_reducer";

interface InputChangeAction {
    type: FORM_ACTION,
    target: { name: string, value: string, type: string, files?: any },
    validationRules: {}
}

export const inputChangeAC: ActionCreator<IFormState, InputChangeAction> = (state: IFormState, action: InputChangeAction) => {
    
    return state;

}

export const clearStateAC: ActionCreator<IFormState, any> = (state: IFormState, action: any) => {
    
    return state;

}

export const setFormErrorAC: ActionCreator<IFormState, any> = (state: IFormState, action: any) => {
    
    return state;

}