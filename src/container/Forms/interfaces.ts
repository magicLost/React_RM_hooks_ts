import {
  IValidatorDesc,
  IFormElementDesc,
  TFormElementsDescs
} from "../../data/feedback_forms_data";
import {
  IFormElementState,
  TFormElementsState,
  IFormState
} from "../../hooks/Form/form";
import { IFormValidatorChain } from "./../../helper/Validation/FormValidatorChain";

export type ActionCreator<T, U> = (state: T, action: U) => T;

export interface IHiddenField {
  name: string;
  value: string;
}

export interface IFormModel {
  validatorChain: IFormValidatorChain;

  validateOnSubmit(stateFormElements: TFormElementsState): string;

  getFormData(
    stateFormElements: TFormElementsState,
    hiddenFields?: IHiddenField[]
  ): FormData;

  validateOnChangeAndReturnModifyState(
    target: any,
    formElements: TFormElementsDescs,
    stateFormElements: TFormElementsState
  ): TFormElementsState;

  hasInputsError(
    stateFormElements: TFormElementsState,
    formError: string
  ): boolean;

  getFormElementsInitState(
    formElements: TFormElementsDescs
  ): TFormElementsState;

  /* getValidatorsDesc(
    name: string,
    formElements: TFormElementsDescs
  ): IValidatorDesc[] | undefined; */
}

export interface IFeedbackModel extends IFormModel {
  createToken(stateFormElements: TFormElementsState): string;
}
