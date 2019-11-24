import { IHiddenField, IFormModel } from "./interfaces";
import { IFormElementState, TFormElementsState } from "../../hooks/Form/form";
import {
  IValidatorDesc,
  IFormElementDesc,
  TFormElementsDescs
} from "../../data/feedback_forms_data";
import { IFormValidatorChain } from "./../../helper/Validation/FormValidatorChain";
//import { ELEMENT_TYPE } from "../../component/Form/Form";
//import {ELEMENT_TYPE} from "./../../component/Form/Form";

export default abstract class FormModel implements IFormModel {
  validatorChain: IFormValidatorChain;

  constructor(validatorChain: IFormValidatorChain) {
    this.validatorChain = validatorChain;
  }

  abstract validateOnSubmit(stateFormElements: TFormElementsState): string;

  getFormElementsInitState(
    formElements: TFormElementsDescs
  ): TFormElementsState {
    const formElementsState: TFormElementsState = new Map();

    formElements.forEach((elemDesc, key, map) => {
      switch (elemDesc.elementType) {
        case "INPUT":
          formElementsState.set(key, { value: "", errors: [] });
          break;
        case "TEXTAREA":
          formElementsState.set(key, { value: "", errors: [] });
          break;
        case "SELECT":
          formElementsState.set(key, {
            value: elemDesc.value,
            errors: []
          });
          break;
        case "FILE_INPUT":
          formElementsState.set(key, { value: "", errors: [] });
          break;
        case "CHECKBOX":
          formElementsState.set(key, {
            value: elemDesc.value,
            checked: elemDesc.checked,
            errors: []
          });
          break;

        default:
          throw new Error(`No implementation for type ${elemDesc.elementType}`);
      }
    });

    return formElementsState;
  }

  getFormData(
    stateFormElements: TFormElementsState,
    hiddenFields: IHiddenField[]
  ): FormData {
    const formData = new FormData();

    /* for (let element of stateFormElements) {
      let value = element.file !== undefined ? element.file : element.value;
      formData.append(element.name, value);
    } */

    stateFormElements.forEach((elemState, key, map) => {
      let value =
        elemState.file !== undefined ? elemState.file : elemState.value;
      formData.append(key, value);
    });

    if (hiddenFields !== undefined && hiddenFields.length > 0) {
      for (let field of hiddenFields) {
        formData.append(field.name, field.value);
      }
    }

    return formData;
  }

  hasInputsError(
    stateFormElements: TFormElementsState,
    formError: string
  ): boolean {
    // if(formError !== '')
    //  return true;

    /* for (let element of stateFormElements) {
      if (element.errors.length !== 0) return true;
    } */
    let isError = false;

    stateFormElements.forEach((elemState, key, map) => {
      if (elemState.errors.length !== 0) isError = true;
    });

    return isError;
  }

  //validators: IValidatorDesc[] | undefined
  validateOnChangeAndReturnModifyState(
    target: any,
    formElements: TFormElementsDescs,
    stateFormElements: TFormElementsState
  ): TFormElementsState {
    if (target.name === undefined || target.value === undefined)
      throw new Error("No name or value on target");

    //console.log("validateOnChange", target.type, target.checked);

    let formElementStateDesc: IFormElementState = {
      value: "",
      errors: []
    };

    switch (target.type) {
      case "select":
        formElementStateDesc = this.selectValidation(target);
        break;
      case "checkbox":
        formElementStateDesc = this.checkboxValidation(target);
        break;
      case "file":
        formElementStateDesc = this.inputFileValidation(target, formElements);
        break;

      default:
        formElementStateDesc = this.inputValidation(target, formElements);
        break;
    }

    stateFormElements.set(target.name, formElementStateDesc);

    return new Map(stateFormElements);
  }

  protected checkboxValidation = (target: any): IFormElementState => {
    return {
      //name: target.name,
      value: target.value,
      checked: target.checked,
      errors: []
    };
  };

  protected selectValidation = (target: any): IFormElementState => {
    return {
      //name: target.name,
      value: target.value,
      errors: []
    };
  };

  protected inputFileValidation = (
    target: any,
    formElements: TFormElementsDescs
  ): IFormElementState => {
    const name = target.name;
    const value = target.value;
    const fileList: FileList = target.files;

    //create new data without errors
    const data: IFormElementState = {
      //name: name,
      value: value,
      file: fileList[0],
      errors: []
    };

    //if value empty we return no error
    if (value === "") return data;

    return this.validateAndReturnDataWithErrors(formElements, data, name);
  };

  protected inputValidation = (
    target: any,
    formElements: TFormElementsDescs
  ): IFormElementState => {
    const name = target.name;
    const value = target.value;

    //create new data without errors
    const data: IFormElementState = {
      //name: name,
      value: value,
      errors: []
    };

    //if value empty we return no error
    if (value === "") return data;

    return this.validateAndReturnDataWithErrors(formElements, data, name);
  };

  protected validateAndReturnDataWithErrors = (
    formElements: TFormElementsDescs,
    data: IFormElementState,
    name: string
  ): IFormElementState => {
    //let errors: string[] = [];

    let validators: IValidatorDesc[] | undefined = undefined;

    formElements.forEach((value, key, map) => {
      if (key === name) validators = value.validators;
    });

    if (validators !== undefined) {
      if (data.file) {
        if (!this.validatorChain.isValid(data.file, validators)) {
          data.errors = this.validatorChain.getErrorMessages();
        }
      } else {
        if (!this.validatorChain.isValid(data.value, validators)) {
          data.errors = this.validatorChain.getErrorMessages();
        }
      }
    }

    return data;
  };

  /* getValidatorsDesc(
    name: string,
    formElements: IFormElementDesc[]
  ): IValidatorDesc[] | undefined {
    for (let element of formElements) {
      if (element.name === name) {
        return element.validators;
      }
    }

    return undefined;
  } */
}

/* import { IHiddenField, IFormModel } from "./interfaces";
import { IFormElementState } from "../../hooks/Form/form";
import {
  IValidatorDesc,
  IFormElementDesc
} from "../../data/feedback_forms_data";
import { IFormValidatorChain } from "./../../helper/Validation/FormValidatorChain";
import { ELEMENT_TYPE } from "../../component/Form/Form";
//import {ELEMENT_TYPE} from "./../../component/Form/Form";

export default abstract class FormModel implements IFormModel {
  validatorChain: IFormValidatorChain;

  constructor(validatorChain: IFormValidatorChain) {
    this.validatorChain = validatorChain;
  }

  abstract validateOnSubmit(stateFormElements: IFormElementState[]): string;

  getFormData(
    stateFormElements: IFormElementState[],
    hiddenFields: IHiddenField[]
  ): FormData {
    const formData = new FormData();

    for (let element of stateFormElements) {
      let value = element.file !== undefined ? element.file : element.value;
      formData.append(element.name, value);
    }

    if (hiddenFields !== undefined && hiddenFields.length > 0) {
      for (let field of hiddenFields) {
        formData.append(field.name, field.value);
      }
    }

    return formData;
  }

  hasInputsError(
    stateFormElements: IFormElementState[],
    formError: string
  ): boolean {
    // if(formError !== '')
          //  return true; 

    for (let element of stateFormElements) {
      if (element.errors.length !== 0) return true;
    }

    return false;
  }

  //validators: IValidatorDesc[] | undefined
  validateOnChange(
    target: any,
    formElements: IFormElementDesc[]
  ): IFormElementState {
    if (target.name === undefined || target.value === undefined)
      throw new Error("No name or value on target");

    //console.log("validateOnChange", target.type, target.checked);

    switch (target.type) {
      case "select":
        return this.selectValidation(target);
      case "checkbox":
        return this.checkboxValidation(target);
      case "file":
        return this.inputFileValidation(target, formElements);

      default:
        return this.inputValidation(target, formElements);
    }
  }

  protected checkboxValidation = (target: any): IFormElementState => {
    return {
      name: target.name,
      value: target.value,
      checked: target.checked,
      errors: []
    };
  };

  protected selectValidation = (target: any): IFormElementState => {
    return {
      name: target.name,
      value: target.value,
      errors: []
    };
  };

  protected inputFileValidation = (
    target: any,
    formElements: IFormElementDesc[]
  ): IFormElementState => {
    const name = target.name;
    const value = target.value;
    const fileList: FileList = target.files;

    //create new data without errors
    const data: IFormElementState = {
      name: name,
      value: value,
      file: fileList[0],
      errors: []
    };

    //if value empty we return no error
    if (value === "") return data;

    //validation
    let errors: string[] = [];

    const validators: IValidatorDesc[] | undefined = this.getValidatorsDesc(
      name,
      formElements
    );

    if (validators !== undefined) {
      if (!this.validatorChain.isValid(fileList[0], validators)) {
        errors = this.validatorChain.getErrorMessages();
      }
    }

    data.errors = errors;

    return data;
  };

  protected inputValidation = (
    target: any,
    formElements: IFormElementDesc[]
  ): IFormElementState => {
    const name = target.name;
    const value = target.value;

    //create new data without errors
    const data: IFormElementState = {
      name: name,
      value: value,
      errors: []
    };

    //if value empty we return no error
    if (value === "") return data;

    //validation
    let errors: string[] = [];

    const validators: IValidatorDesc[] | undefined = this.getValidatorsDesc(
      name,
      formElements
    );

    if (validators !== undefined) {
      if (!this.validatorChain.isValid(value, validators)) {
        errors = this.validatorChain.getErrorMessages();
      }
    }

    data.errors = errors;

    return data;
  };

  getFormElementsInitState(
    formElements: IFormElementDesc[]
  ): IFormElementState[] {
    const formElementsState = [];

    for (let element of formElements) {
      switch (element.elementType) {
        case ELEMENT_TYPE.INPUT:
          formElementsState.push({ name: element.name, value: "", errors: [] });
          break;
        case ELEMENT_TYPE.SELECT:
          formElementsState.push({
            name: element.name,
            value: element.value,
            errors: []
          });
          break;
        case ELEMENT_TYPE.FILE_INPUT:
          formElementsState.push({ name: element.name, value: "", errors: [] });
          break;
        case ELEMENT_TYPE.CHECKBOX:
          formElementsState.push({
            name: element.name,
            value: element.value,
            checked: element.checked,
            errors: []
          });
          break;

        default:
          break;
        //throw new Error(`No implementation for type ${element.elementType}`);
      }
    }

    return formElementsState;
  }

  getValidatorsDesc(
    name: string,
    formElements: IFormElementDesc[]
  ): IValidatorDesc[] | undefined {
    for (let element of formElements) {
      if (element.name === name) {
        return element.validators;
      }
    }

    return undefined;
  }
}
 */
