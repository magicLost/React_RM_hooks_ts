import React, { useState, useRef } from "react";
//import axios from 'axios';
//import { inputChangeAC, clearStateAC, setFormErrorAC } from './formAC';
import {
  FORM_ELEMENTS,
  TFormElementsDescs
} from "../../data/feedback_forms_data";
import { CALC_PRICE_ELEMENTS_NAMES } from "../../data/calc_price_form_data";
import { IFormElementDesc } from "../../data/feedback_forms_data";

import FeedbackController from "../../container/Forms/Feedback/FeedbackController/FeedbackController";
import FeedbackModel from "../../container/Forms/Feedback/FeedbackModel/FeedbackModel";

import FormValidatorChain from "../../helper/Validation/FormValidatorChain";
import { FORM_TYPE } from "../../data/feedback_forms_data";
import { IFormController } from "../../container/Forms/FormController";

import CalcPriceController from "../../container/Forms/CalcPrice/Controller/CalcPriceController";
import CalcPriceModel from "../../container/Forms/CalcPrice/Model/CalcPriceModel";
import { PriceMultiply } from "../../data/calc_price_form_data";

export interface IFormElementState {
  //name: FORM_ELEMENTS | CALC_PRICE_ELEMENTS_NAMES;
  value: string;
  errors: string[];
  file?: File;
  checked?: boolean;
}

export type TFormElementsState = Map<
  FORM_ELEMENTS | CALC_PRICE_ELEMENTS_NAMES,
  IFormElementState
>;

export interface IFormState {
  //formController: IFormController,

  formError: string;
  formMessage: string;
  formElementsState: TFormElementsState;
}

type useFormReturn = {
  controller: IFormController;

  formError: string;
  formMessage: string;
  formElementsState: TFormElementsState;
  //setFormState: React.Dispatch<((prevState: IFormState) => IFormState) | IFormState> | null
};

const getController = (
  formType: FORM_TYPE,
  formElements: TFormElementsDescs,
  url: string,
  priceMultiply: PriceMultiply | undefined = undefined
): IFormController => {
  switch (formType) {
    case "CALC_PRICE":
      if (priceMultiply === undefined) throw new Error("No priceMultiply");
      return new CalcPriceController(
        formElements,
        new CalcPriceModel(new FormValidatorChain()),
        priceMultiply
      );
    case "CALL_ME":
      return new FeedbackController(
        formElements,
        new FeedbackModel(new FormValidatorChain(), true),
        url
      );
    case "FEEDBACK":
      return new FeedbackController(
        formElements,
        new FeedbackModel(new FormValidatorChain(), false),
        url
      );
    case "WANNA_THE_SAME":
      return new FeedbackController(
        formElements,
        new FeedbackModel(new FormValidatorChain(), false),
        url
      );

    default:
      throw new Error(`No controller for type ${formType}`);
  }
};

//, formElementsStateInit: IFormElementState[]
export const useForm = (
  url: string,
  formElements: TFormElementsDescs,
  formType: FORM_TYPE,
  priceMultiply: PriceMultiply | undefined = undefined
): useFormReturn => {
  const controllerRef: React.MutableRefObject<IFormController | null> = useRef(
    null
  );

  const [formState, setFormState] = useState(
    (): IFormState => {
      const controller = getController(
        formType,
        formElements,
        url,
        priceMultiply
      );

      const formElementsState = controller.model.getFormElementsInitState(
        formElements
      );

      controllerRef.current = controller;

      return {
        formError: "",
        formMessage: "",
        formElementsState: formElementsState
      };
    }
  );

  if (controllerRef.current === null) throw new Error("No controller");

  controllerRef.current.setFormState = setFormState;

  return {
    controller: controllerRef.current,
    formError: formState.formError,
    formMessage: formState.formMessage,
    formElementsState: formState.formElementsState
    //setFormState: setFormState
  };
};

export interface IFormRequest {
  isRequestSuccess: boolean;
  isRequestError: boolean;
  isRequestLoading: boolean;
}

export const useFormRequest = () => {
  const initState: IFormRequest = {
    isRequestSuccess: false,
    isRequestError: false,
    isRequestLoading: false
  };

  const [requestState, setRequestState] = useState(initState);

  return {
    isRequestLoading: requestState.isRequestLoading,
    isRequestSuccess: requestState.isRequestSuccess,
    setRequestState: setRequestState
  };
};

/* import React, { useState, useRef } from "react";
//import axios from 'axios';
//import { inputChangeAC, clearStateAC, setFormErrorAC } from './formAC';
import { FORM_ELEMENTS } from "../../data/feedback_forms_data";
import { CALC_PRICE_ELEMENTS_NAMES } from "../../data/calc_price_form_data";
import { IFormElementDesc } from "../../data/feedback_forms_data";

import FeedbackController from "../../container/Forms/Feedback/FeedbackController/FeedbackController";
import FeedbackModel from "../../container/Forms/Feedback/FeedbackModel/FeedbackModel";

import FormValidatorChain from "../../helper/Validation/FormValidatorChain";
import { FORM_TYPE } from "../../data/feedback_forms_data";
import { IFormController } from "../../container/Forms/FormController";

import CalcPriceController from "../../container/Forms/CalcPrice/Controller/CalcPriceController";
import CalcPriceModel from "../../container/Forms/CalcPrice/Model/CalcPriceModel";
import { PriceMultiply } from "../../data/calc_price_form_data";

export interface IFormElementState {
  name: FORM_ELEMENTS | CALC_PRICE_ELEMENTS_NAMES;
  value: string;
  errors: string[];
  file?: File;
  checked?: boolean;
}

export interface IFormState {
  //formController: IFormController,

  formError: string;
  formMessage: string;
  formElementsState: IFormElementState[];
}

type useFormReturn = {
  controller: IFormController;

  formError: string;
  formMessage: string;
  formElementsState: IFormElementState[];
  //setFormState: React.Dispatch<((prevState: IFormState) => IFormState) | IFormState> | null
};

const getController = (
  formType: FORM_TYPE,
  formElements: IFormElementDesc[],
  url: string,
  priceMultiply: PriceMultiply | undefined = undefined
): IFormController => {
  
  switch (formType) {
    case "CALC_PRICE":
      if (priceMultiply === undefined) throw new Error("No priceMultiply");
      return new CalcPriceController(
        formElements,
        new CalcPriceModel(new FormValidatorChain()),
        priceMultiply
      );
    case "CALL_ME":
      return new FeedbackController(
        formElements,
        new FeedbackModel(new FormValidatorChain(), true),
        url
      );
    case "FEEDBACK":
      return new FeedbackController(
        formElements,
        new FeedbackModel(new FormValidatorChain(), false),
        url
      );
    case "WANNA_THE_SAME":
      return new FeedbackController(
        formElements,
        new FeedbackModel(new FormValidatorChain(), false),
        url
      );

    default:
      throw new Error(`No controller for type ${formType}`);
  }
};

//, formElementsStateInit: IFormElementState[]
export const useForm = (
  url: string,
  formElements: IFormElementDesc[],
  formType: FORM_TYPE,
  priceMultiply: PriceMultiply | undefined = undefined
): useFormReturn => {
  const controllerRef: React.MutableRefObject<IFormController | null> = useRef(
    null
  );

  const [formState, setFormState] = useState(() => {
    const controller = getController(formType, formElements, url);

    const formElementsState = controller.model.getFormElementsInitState(
      formElements
    );

    controllerRef.current = controller;

    return {
      formError: "",
      formMessage: "",
      formElementsState: formElementsState
    };
  });

  if (controllerRef.current === null) throw new Error("No controller");

  controllerRef.current.setFormState = setFormState;

  return {
    controller: controllerRef.current,
    formError: formState.formError,
    formMessage: formState.formMessage,
    formElementsState: formState.formElementsState
    //setFormState: setFormState
  };
};

export interface IFormRequest {
  isRequestSuccess: boolean;
  isRequestError: boolean;
  isRequestLoading: boolean;
}

export const useFormRequest = () => {
  const initState: IFormRequest = {
    isRequestSuccess: false,
    isRequestError: false,
    isRequestLoading: false
  };

  const [requestState, setRequestState] = useState(initState);

  return {
    isRequestLoading: requestState.isRequestLoading,
    isRequestSuccess: requestState.isRequestSuccess,
    setRequestState: setRequestState
  };
};
 */
