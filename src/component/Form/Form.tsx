import React, { useMemo } from "react";
import classes from "./Form.module.scss";
import Button from "../UI/Button/Button";
import { TFormElementsDescs } from "../../data/feedback_forms_data";
import { IFormElementState, TFormElementsState } from "../../hooks/Form/form";
//import { IFormController } from "./../../container/Forms/FormController";
import Input from "../FormElements/Input/Input";
import Textarea from "../FormElements/Textarea/Textarea";
import Checkbox from "../FormElements/Checkbox/Checkbox";
import Select, { Option } from "../FormElements/Select/Select";

export type ELEMENT_TYPE =
  | "INPUT"
  | "TEXTAREA"
  | "FILE_INPUT"
  | "SELECT"
  | "CHECKBOX";

interface FormProps {
  formError: string;
  formMessage: string;
  onSubmit: (event: any) => void;
  onClear: (event: any) => void;
  onChange: (event: any) => void;
  elementsDescs: TFormElementsDescs;
  formElementsState: TFormElementsState;
  //children: {};

  submitButtonLabel: string;

  //isSuccess?: boolean;
  //onSuccess?: (event: {}) => void;
  isLoading?: boolean;
}

export const renderElements = (
  formElementsDescs: TFormElementsDescs,
  formElementsState: TFormElementsState,
  onChange: (event: any) => void,
  isLoading: boolean
) => {
  const elements: JSX.Element[] = [];

  formElementsDescs.forEach((elemDesc, key, map) => {
    let state = undefined;
    switch (elemDesc.elementType) {
      case "INPUT":
        state = formElementsState.get(key) as IFormElementState;
        //console.log("FORM STATE", key, formElementsState);
        //console.log("STATE", state);

        elements.push(
          <Input
            key={classes.Test + key}
            elementAttrs={elemDesc.elementAttrs}
            disabled={isLoading}
            onChange={onChange}
            value={state.value}
            name={key}
            labelValue={elemDesc.labelValue}
            error={state.errors.length > 0 ? state.errors[0] : ""}
          />
        );
        break;
      case "TEXTAREA":
        state = formElementsState.get(key) as IFormElementState;

        elements.push(
          <Textarea
            key={classes.Test + key}
            elementAttrs={elemDesc.elementAttrs}
            disabled={isLoading}
            onChange={onChange}
            name={key}
            value={state.value}
            labelValue={elemDesc.labelValue}
            error={state.errors.length > 0 ? state.errors[0] : ""}
            isResize={true}
          />
        );
        break;
      case "SELECT":
        state = formElementsState.get(key) as IFormElementState;

        elements.push(
          <Select
            key={classes.Test + key}
            elementAttrs={elemDesc.elementAttrs}
            name={key}
            disabled={isLoading}
            options={elemDesc.selectOptions as Option[]}
            onChange={onChange}
            value={state.value}
            labelValue={elemDesc.labelValue}
          />
        );
        break;
      case "CHECKBOX":
        state = formElementsState.get(key) as IFormElementState;

        elements.push(
          <Checkbox
            key={classes.Test + key}
            elementAttrs={elemDesc.elementAttrs}
            name={key}
            disabled={isLoading}
            onChange={onChange}
            checked={state.checked as boolean}
            value={elemDesc.value}
            labelValue={elemDesc.labelValue}
          />
        );
        break;

      default:
        throw new Error(`No implementation for type ${elemDesc.elementType}`);
    }
  });

  return elements;
};

const Form = ({
  elementsDescs,
  formElementsState,
  formError,
  formMessage,

  onSubmit,
  onClear,
  onChange,
  //children,
  submitButtonLabel = "Отправить",
  isLoading = false
}: FormProps) => {
  const elements = renderElements(
    elementsDescs,
    formElementsState,
    onChange,
    isLoading
  );

  console.log("RENDER Form", isLoading);
  return (
    <div className={classes.Wrapper}>
      <div className={classes.Form}>
        <form action={"#"} className={classes.FormElements} onSubmit={onSubmit}>
          {elements}

          <div className={classes.Message}>
            {formError && (
              <div className={classes.FormError}>
                <p>{formError}</p>
              </div>
            )}

            {formMessage && (
              <div className={classes.FormMessage}>
                <p>{formMessage}</p>
              </div>
            )}
          </div>

          <div className={classes.Buttons}>
            <Button
              label={"Очистить"}
              type={"OUTLINED"}
              onClick={onClear}
              style={{
                color: "rgba(0, 0, 0, 0.3)",
                borderColor: "rgba(0, 0, 0, 0.3)"
              }}
              disabled={isLoading}
              isLoading={false}
            />

            <Button
              label={submitButtonLabel}
              type={"OUTLINED"}
              onClick={onSubmit}
              style={{
                color: "rgba(178, 243, 141, 0.85)",
                borderColor: "rgba(178, 243, 141, 0.85)"
              }}
              disabled={isLoading}
              isLoading={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(Form);

/* import React, { useMemo } from "react";
import classes from "./Form.module.scss";
import Button from "../UI/Button/Button";

export type ELEMENT_TYPE =
  | "INPUT"
  | "TEXTAREA"
  | "FILE_INPUT"
  | "SELECT"
  | "CHECKBOX";

interface FormProps {
  formError: string;
  formMessage: string;
  onSubmit: (event: {}) => void;
  onClear: (event: {}) => void;
  children: {};

  submitButtonLabel: string;

  isSuccess?: boolean;
  onSuccess?: (event: {}) => void;
  isLoading?: boolean;
}

const Form = ({
  formError,
  formMessage,
  onSubmit,
  onClear,
  children,
  submitButtonLabel = "Отправить",
  isLoading = false,
  isSuccess = false,
  onSuccess = undefined
}: FormProps) => {
  return (
    <div className={classes.Wrapper}>
      <div className={classes.Form}>
        <form action={"#"} className={classes.FormElements} onSubmit={onSubmit}>
          {children}

          {formError && (
            <div className={classes.FormError}>
              <p>{formError}</p>
            </div>
          )}

          {formMessage && (
            <div className={classes.FormMessage}>
              <p>{formMessage}</p>
            </div>
          )}

          <div className={classes.Buttons}>
            {useMemo(
              () => (
                <Button
                  label={"Очистить"}
                  type={"OUTLINED"}
                  onClick={onClear}
                  style={{
                    color: "rgba(0, 0, 0, 0.3)",
                    borderColor: "rgba(0, 0, 0, 0.3)"
                  }}
                  disabled={isLoading}
                  isLoading={false}
                />
              ),
              [isLoading]
            )}

            {useMemo(() => {
              if (isSuccess) return null;

              return (
                <Button
                  label={submitButtonLabel}
                  type={"OUTLINED"}
                  onClick={onSubmit}
                  style={{
                    color: "rgba(178, 243, 141, 0.85)",
                    borderColor: "rgba(178, 243, 141, 0.85)"
                  }}
                  disabled={isLoading}
                  isLoading={isLoading}
                />
              );
            }, [isLoading, isSuccess])}

            {useMemo(() => {
              if (!isSuccess) return null;

              return (
                <Button
                  label={"Ок"}
                  type={"OUTLINED"}
                  onClick={onSuccess}
                  style={{
                    color: "rgba(178, 243, 141, 0.85)",
                    borderColor: "rgba(178, 243, 141, 0.85)"
                  }}
                  disabled={false}
                  isLoading={false}
                />
              );
            }, [isSuccess])}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
 */
