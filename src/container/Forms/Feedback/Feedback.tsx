import React from "react";
import classes from "./Feedback.module.scss";

import { IHiddenField } from "./../interfaces";
import { useForm, useFormRequest } from "../../../hooks/Form/form";
import FeedbackController from "./FeedbackController/FeedbackController";
import {
  feedbackElementsMap,
  callMeElementsMap
} from "../../../data/feedback_forms_data";
import Form from "../../../component/Form/Form";

interface FeedbackProps {
  url: string;
  //successOkButtonClickHandler: (event: any) => void;
  isCallMe: boolean;
  hiddenFields?: IHiddenField[];
}

const Feedback = ({
  url,
  //successOkButtonClickHandler,
  isCallMe,
  hiddenFields
}: FeedbackProps) => {
  const formElementsMap = isCallMe ? callMeElementsMap : feedbackElementsMap;

  const { controller, formError, formMessage, formElementsState } = useForm(
    url,
    formElementsMap,
    isCallMe ? "CALL_ME" : "FEEDBACK"
  );

  const {
    isRequestLoading,
    isRequestSuccess,
    setRequestState
  } = useFormRequest();

  (controller as FeedbackController).hiddenFields = hiddenFields;
  (controller as FeedbackController).setRequestState = setRequestState;

  return (
    <div className={classes.Feedback}>
      <Form
        formError={formError}
        formMessage={formMessage}
        formElementsState={formElementsState}
        elementsDescs={formElementsMap}
        submitButtonLabel={"Отправить"}
        onChange={controller.onChange}
        onClear={controller.onClear}
        onSubmit={controller.onSubmit}
        isLoading={isRequestLoading}
      />
    </div>
  );
};

export default Feedback;

/* import React, { useMemo } from "react";
import classes from "./Feedback.module.scss";

import { IHiddenField } from "./../interfaces";
import { useForm, useFormRequest } from "../../../hooks/Form/form";
import FeedbackController from "./FeedbackController/FeedbackController";
import {
  feedbackElementsMap,
  callMeElementsMap
} from "../../../data/feedback_forms_data";
import FeedbackForm from "./FeedbackForm/FeedbackForm";
import CallMeForm from "../CallMe/CallMeForm/CallMeForm";

interface FeedbackProps {
  url: string;
  successOkButtonClickHandler: (event: any) => void;
  isCallMe: boolean;
  hiddenFields?: IHiddenField[];
}

const Feedback = ({
  url,
  successOkButtonClickHandler,
  isCallMe,
  hiddenFields
}: FeedbackProps) => {
  const formElements = isCallMe ? callMeElementsMap : feedbackElementsMap;

  const { controller, formError, formMessage, formElementsState } = useForm(
    url,
    formElements,
    isCallMe ? "CALL_ME" : "FEEDBACK"
  );

  const {
    isRequestLoading,
    isRequestSuccess,
    setRequestState
  } = useFormRequest();

  (controller as FeedbackController).hiddenFields = hiddenFields;
  (controller as FeedbackController).setRequestState = setRequestState;

  //formElements, formError, formElementsState, onChange, onSubmit, onClear, isLoading = false
  return (
    <div className={classes.Feedback}>
      {useMemo(() => {
        if (isCallMe) {
          return (
            <CallMeForm
              formElements={formElements}
              formElementsState={formElementsState}
              formError={formError}
              formMessage={formMessage}
              onChange={controller.onChange}
              onSubmit={controller.onSubmit}
              onClear={controller.onClear}
              isLoading={isRequestLoading}
              isSuccess={isRequestSuccess}
              onSuccess={successOkButtonClickHandler}
            />
          );
        } else {
          return (
            <FeedbackForm
              formElements={formElements}
              formElementsState={formElementsState}
              formError={formError}
              formMessage={formMessage}
              onChange={controller.onChange}
              onSubmit={controller.onSubmit}
              onClear={controller.onClear}
              isLoading={isRequestLoading}
              isSuccess={isRequestSuccess}
              onSuccess={successOkButtonClickHandler}
            />
          );
        }
      }, [
        formElementsState,
        formError,
        formMessage,
        isRequestLoading,
        isRequestSuccess,
        isCallMe
      ])}
    </div>
  );
};

export default Feedback;
 */
