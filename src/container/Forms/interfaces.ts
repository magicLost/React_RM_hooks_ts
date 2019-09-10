import {IValidatorDesc, IFormElementDesc} from "./../../data/forms";
import {IFormElementState, IFormState} from "../../hooks/Form/form_reducer";
import {IFormValidatorChain} from "./../../helper/Validation/FormValidatorChain";

export type ActionCreator<T, U> = (state: T, action: U) => T;

export interface IHiddenField {
    name: string;
    value: string;
}

export interface IFormModel{

    validatorChain: IFormValidatorChain;

    validateOnSubmit(stateFormElements: IFormElementState[]): string;

    getFormData(stateFormElements: IFormElementState[], hiddenFields?: IHiddenField[]): FormData;

    inputValidation(target: any, formElements: IFormElementDesc[]): IFormElementState;
    

    hasInputsError(stateFormElements: IFormElementState[], formError: string): boolean;


    getFormElementsInitState(formElements: IFormElementDesc[]): IFormElementState[];

    getValidatorsDesc(name: string, formElements: IFormElementDesc[]): IValidatorDesc[] | undefined;

}

export interface IFeedbackModel extends IFormModel {

    createToken(stateFormElements: IFormElementState[]): string;

}


