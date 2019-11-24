import {
  IFormElementState,
  TFormElementsState
} from "../../../../hooks/Form/form";
//import { IFeedbackModel } from "./../../interfaces";
import {
  Materials,
  Quality,
  PriceMultiply
} from "../../../../data/calc_price_form_data";
import FormModel from "../../FormModel";
import { IFormElementDesc } from "../../../../data/feedback_forms_data";
import { ELEMENT_TYPE } from "../../../../component/Form/Form";

//import { IFormValidatorChain } from "./../../../../helper/Validation/FormValidatorChain";

export type INPUT_DATA = {
  [name: string]: number;
};

class CalcPriceModel extends FormModel {
  validateOnSubmit(stateFormElements: TFormElementsState): string {
    let width = "";
    let height = "";

    stateFormElements.forEach((elemDesc, key, map) => {
      switch (key) {
        case "WIDTH":
          width = elemDesc.value;
          break;
        case "HEIGHT":
          height = elemDesc.value;
          break;
      }
    });

    if (width === "" || height === "") {
      return "Укажите размеры, пожалуйста.";
    }

    return "";
  }

  calcPrice(
    stateFormElements: TFormElementsState,
    priceMultiply: PriceMultiply
  ): string {
    const data = this.getData(stateFormElements);
    let result = 0;

    result = ((data.width * data.height) / 10000) * priceMultiply.m2;

    result *= priceMultiply.material[data.material];

    result *= priceMultiply.quality[data.quality];

    if (data.rezka !== "") result *= priceMultiply.REZKA;

    if (data.speed !== "") result *= priceMultiply.SPEED;

    if (!result) return "Не удалось посчитать...";

    return `Примерная стоимость - ${result} руб.`;
  }

  getData(stateFormElements: TFormElementsState) {
    let width: number = 0;
    let height: number = 0;
    let quality: Quality = "720dpi";
    let material: Materials = "BACKLIT";
    let rezka: string = "";
    let speed: string = "";

    stateFormElements.forEach((elemDesc, key, map) => {
      switch (key) {
        case "WIDTH":
          width = parseInt(elemDesc.value);
          break;
        case "HEIGHT":
          height = parseInt(elemDesc.value);
          break;
        case "QUALITY":
          quality = elemDesc.value as Quality;
          break;
        case "MATERIAL":
          material = elemDesc.value as Materials;
          break;
        case "REZKA_V_KRAI":
          rezka = elemDesc.checked ? "REZKA" : "";
          break;
        case "SPEED":
          speed = elemDesc.checked ? "SPEED" : "";
          break;

        default:
          throw new Error(`What the name ${key}`);
      }
    });

    return {
      width: width,
      height: height,
      quality: quality,
      material: material,
      rezka: rezka,
      speed: speed
    };
  }
}

export default CalcPriceModel;
