import React, { useEffect, useReducer, useRef, useMemo, useState } from "react";
import { BUTTON_TYPE } from "../UI/Button/Button";
import classes from "./Test.module.scss";
import {
  calcPriceElements,
  calcPriceElementsMap,
  priceMultiply
} from "./../../data/calc_price_form_data";
import Select, { Option } from "../FormElements/Select/Select";
import Checkbox from "../FormElements/Checkbox/Checkbox";
import Input from "../FormElements/Input/Input";
import {
  useForm,
  IFormElementState,
  TFormElementsState,
  useFormRequest
} from "../../hooks/Form/form";
import {
  callMeElementsMap,
  TFormElementsDescs
} from "../../data/feedback_forms_data";
import FeedbackController from "../../container/Forms/Feedback/FeedbackController/FeedbackController";
import Form from "../Form/Form";

const Test = () => {
  const { controller, formError, formMessage, formElementsState } = useForm(
    "http://public.local/call-me",
    calcPriceElementsMap,
    "CALC_PRICE",
    priceMultiply
  );

  /* const {
    isRequestLoading,
    isRequestSuccess,
    setRequestState
  } = useFormRequest();

  (controller as FeedbackController).setRequestState = setRequestState; */

  useEffect(() => {
    //console.log("calcPriceElementsMap ", calcPriceElementsMap);
  }, []);

  console.log("Test render", formElementsState);

  return (
    <div className={classes.Test}>
      <Form
        formError={formError}
        formMessage={formMessage}
        formElementsState={formElementsState}
        elementsDescs={calcPriceElementsMap}
        submitButtonLabel={"Рассчитать"}
        onChange={controller.onChange}
        onClear={controller.onClear}
        onSubmit={controller.onSubmit}
        isLoading={false}
      />
    </div>
  );
};

export default Test;
