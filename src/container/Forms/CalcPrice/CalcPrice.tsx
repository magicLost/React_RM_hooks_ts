import React, { useMemo, useRef } from "react";
import classes from "./CalcPrice.module.scss";

import Form from "../../../component/Form/Form";
import {
  calcPriceElementsMap,
  priceMultiply
} from "./../../../data/calc_price_form_data";
import { useForm } from "../../../hooks/Form/form";

interface CalcPriceProps {}

const CalcPrice = ({}: CalcPriceProps) => {
  const { controller, formError, formMessage, formElementsState } = useForm(
    "",
    calcPriceElementsMap,
    "CALC_PRICE",
    priceMultiply
  );

  console.log("CalcPrice render");

  return (
    <div className={classes.CalcPrice}>
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

export default CalcPrice;
