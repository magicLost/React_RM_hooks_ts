import { IFormModel, IFeedbackModel } from "./interfaces";
import {
  IValidatorDesc,
  IFormElementDesc,
  TFormElementsDescs
} from "../../data/feedback_forms_data";
import {
  IFormElementState,
  IFormState,
  TFormElementsState
} from "../../hooks/Form/form";

export interface IFormController {
  formElements: TFormElementsDescs;
  model: IFormModel;

  setFormState: React.Dispatch<
    ((prevState: IFormState) => IFormState) | IFormState
  > | null;

  onClear: (event: any) => void | undefined;
  onSubmit: (event: any) => void | undefined;
  onChange: (event: any) => void | undefined;
}

export abstract class FormController implements IFormController {
  formElements: TFormElementsDescs;
  model: IFormModel;

  setFormState: React.Dispatch<
    ((prevState: IFormState) => IFormState) | IFormState
  > | null = null;

  constructor(formElements: TFormElementsDescs, model: IFormModel) {
    this.formElements = formElements;
    this.model = model;
  }

  abstract onClear: (event: any) => void | undefined;
  abstract onSubmit: (event: any) => void | undefined;
  abstract onChange: (event: any) => void | undefined;

  protected abstract onSubmitHandler(): void | undefined;
  protected onChangeHandler(target: any): void | undefined {
    if (this.setFormState === null) throw new Error("No setFormState...");

    //const validatorsDesc: IValidatorDesc[] | undefined = this.model.getValidatorsDesc(this.formElements);

    //console.log("onChangeHandler ", target);

    //console.log("onChangeHandler ", formElementState);

    /* this.formDispatch({
          type: FORM_ACTION.INPUT_CHANGE,
          formElementState: formElementState
      }); */

    this.setFormState((prevState: IFormState) => {
      const newFormElementsState = this.model.validateOnChangeAndReturnModifyState(
        target,
        this.formElements,
        prevState.formElementsState
      );

      /* const newFormElementsState: TFormElementsState = {};

      for (let element of prevState.formElementsState) {
        if (element.name === formElementState.name) {
          newFormElementsState.push(formElementState);
        } else {
          newFormElementsState.push(element);
        }
      } */

      return {
        formError: "",
        formMessage: "",
        formElementsState: newFormElementsState
      };
    });
  }

  protected onClearHandler(): void | undefined {
    if (this.setFormState === null) throw new Error("No setFormState...");

    this.setFormState((prevState: IFormState) => {
      const formElementsState = this.model.getFormElementsInitState(
        this.formElements
      );

      return {
        formError: "",
        formMessage: "",
        formElementsState: formElementsState
      };
    });
  }
}
