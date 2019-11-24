import { FormController } from "./../../FormController";
import { IFormState } from "./../../../../hooks/Form/form";
import CalcPriceModel from "../Model/CalcPriceModel";
import { PriceMultiply } from "../../../../data/calc_price_form_data";
import {
  IFormElementDesc,
  TFormElementsDescs
} from "../../../../data/feedback_forms_data";
import { IFormModel } from "../../interfaces";

class CalcPriceController extends FormController {
  /* 
  qualitySelectRef: React.MutableRefObject<HTMLInputElement>;
  materialSelectRef: React.MutableRefObject<HTMLInputElement>;

  rezkaCheckboxRef: React.MutableRefObject<HTMLInputElement>;
  speedCheckboxRef: React.MutableRefObject<HTMLInputElement>; */
  priceMultiply: PriceMultiply;

  constructor(
    formElements: TFormElementsDescs,
    model: CalcPriceModel,
    priceMultiply: PriceMultiply
  ) {
    super(formElements, model);
    this.priceMultiply = priceMultiply;
  }

  onClear = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    this.onClearHandler();
  };

  onChange = (event: any) => {
    //event.preventDefault();
    event.stopPropagation();

    console.log("onChange");

    this.onChangeHandler(event.target);
  };

  onSubmit = (event: any): void | undefined => {
    event.preventDefault();
    event.stopPropagation();

    this.onSubmitHandler();
  };

  protected onSubmitHandler(): void | undefined {
    if (this.setFormState === null) throw new Error("No setFormState...");

    this.setFormState((prevState: IFormState) => {
      if (
        this.model.hasInputsError(
          prevState.formElementsState,
          prevState.formError
        )
      )
        return prevState;

      const formError = this.model.validateOnSubmit(
        prevState.formElementsState
      );

      if (!formError) {
        //get data from state

        //calc

        try {
          const result = (this.model as CalcPriceModel).calcPrice(
            prevState.formElementsState,
            this.priceMultiply
          );

          return {
            formError: "",
            formMessage: result,
            formElementsState: prevState.formElementsState
          };
        } catch (error) {
          return {
            formError: "",
            formMessage: "Я не знаю...",
            formElementsState: prevState.formElementsState
          };
        }

        //set formMessage to state
      } else {
        return {
          formError: formError,
          formMessage: "",
          formElementsState: prevState.formElementsState
        };
      }
    });
  }
}

export default CalcPriceController;
