import { TFormElementsState } from "../../../../hooks/Form/form";
import { IFeedbackModel } from "./../../interfaces";
import FormModel from "../../FormModel";
import { IFormValidatorChain } from "./../../../../helper/Validation/FormValidatorChain";

class FeedbackModel extends FormModel implements IFeedbackModel {
  isCallMe: boolean;

  constructor(validatorChain: IFormValidatorChain, isCallMe: boolean) {
    super(validatorChain);

    this.isCallMe = isCallMe;
  }

  validateOnSubmit(stateFormElements: TFormElementsState): string {
    let name = "";
    let email = "";
    let phone = "";

    stateFormElements.forEach((elemDesc, key, map) => {
      switch (key) {
        case "NAME":
          name = elemDesc.value;
          break;
        case "EMAIL":
          email = elemDesc.value;
          break;
        case "PHONE":
          phone = elemDesc.value;
          break;
      }
    });

    if (name === "") {
      return "Представьтесь, пожалуйста.";
    }

    if (this.isCallMe) {
      if (phone === "") {
        return "Укажите ваш номер телефона иначе мы не сможем с вами связаться.";
      }
    } else {
      if (email === "" && phone === "") {
        return "Укажите ваш телефон или электронный адрес иначе мы не сможем с вами связаться.";
      }
    }

    return "";
  }

  createToken(stateFormElements: TFormElementsState): string {
    let name = "";
    let email = "";
    let phone = "";

    stateFormElements.forEach((elemDesc, key, map) => {
      switch (key) {
        case "NAME":
          name = elemDesc.value;
          break;
        case "EMAIL":
          email = elemDesc.value;
          break;
        case "PHONE":
          phone = elemDesc.value;
          break;
      }
    });

    let stringToHash = name + email + phone;

    stringToHash = encodeURI(stringToHash).substr(0, 63);

    let token = btoa(stringToHash);

    if (token.length > 64) {
      token = token.substr(0, 63);
    }

    return token;
  }
}

export default FeedbackModel;
