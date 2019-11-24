import FeedbackController from "./FeedbackController";
import FeedbackModel from "../FeedbackModel/FeedbackModel";
import { feedbackElements } from "../../../../data/feedback_forms_data";
import FormValidatorChain from "../../../../helper/Validation/FormValidatorChain";

let controller = null;
let newState = null;
let model = null;

describe("FeedbackController", () => {
  beforeEach(() => {
    model = new FeedbackModel(new FormValidatorChain());
    model.getValidatorsDesc = jest.fn();
    model.getValidatorsDesc.mockReturnValue({ hello: "buy" });
    model.inputValidation = jest.fn();
    model.inputValidation.mockReturnValue({
      name: "value",
      error: "Big error"
    });

    controller = new FeedbackController(feedbackElements, model, "super.puper");

    controller.setFormState = callback => {
      newState = callback({
        formController: "ctrl",
        formElementsState: [
          { name: "value", error: "" },
          { name: "other", error: "" }
        ]
      });
    };
  });

  test("onChangeHandler", () => {
    controller.onChangeHandler("target");

    expect(model.getValidatorsDesc).toHaveBeenNthCalledWith(
      1,
      feedbackElements
    );
    expect(model.inputValidation).toHaveBeenNthCalledWith(1, "target", {
      hello: "buy"
    });

    expect(newState).toEqual({
      formController: "ctrl",
      formElementsState: [
        { name: "value", error: "Big error" },
        { name: "other", error: "" }
      ],
      formError: ""
    });
  });
});
