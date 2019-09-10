import React, {useMemo} from 'react';
import classes from './Feedback.module.scss';

import {IHiddenField} from "./../interfaces";
import { useForm, useFormRequest } from '../../../hooks/Form/form';
import FeedbackController from './FeedbackController/FeedbackController';
import {feedbackElements, callMeElements} from "./../../../data/forms";
import FeedbackModel from './FeedbackModel/FeedbackModel';
import FormValidatorChain from "./../../../helper/Validation/FormValidatorChain";
import FeedbackForm from './FeedbackForm/FeedbackForm';
import CallMeForm from '../CallMe/CallMeForm/CallMeForm';
import {IFormState} from "../../../hooks/Form/form";
        
interface FeedbackProps  {
    url: string;
    successOkButtonClickHandler: (event: any) => void;
    isCallMe: boolean;
    hiddenFields?: IHiddenField[];
}

const getInitState = (isCallMe: boolean, url: string) => {

    const formElements = isCallMe ? callMeElements : feedbackElements;

    const controller = new FeedbackController(
        formElements, 
        new FeedbackModel(new FormValidatorChain(), isCallMe),
        url
    );

    const initState: IFormState = {
        formController: controller,
        formError: '', 
        formMessage: 'Мы готовы исполнить любую вашу прихоть.',
        formElementsState: controller.model.getFormElementsInitState(formElements)
    }

    return initState;

}

const Feedback = ({url, successOkButtonClickHandler, isCallMe, hiddenFields}: FeedbackProps) => {

    const formElements = isCallMe ? callMeElements : feedbackElements;

    const { controller, formError, formMessage, formElementsState, setFormState } = useForm(url, formElements, () => getInitState(isCallMe, url));
            
    const { isRequestLoading, isRequestSuccess, setRequestState } = useFormRequest();

    controller.setFormState = setFormState;
    (controller as FeedbackController).setRequestState = setRequestState;

    //formElements, formError, formElementsState, onChange, onSubmit, onClear, isLoading = false
    return (
        
        <div className={classes.Feedback}>

            { useMemo(() => {

                if(isCallMe){
                    return <CallMeForm
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
                    />;
                }else{

                    return <FeedbackForm 
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
                    />;
                }

            }, [formElementsState, formError, formMessage, isRequestLoading, isRequestSuccess, isCallMe ]) }

        </div>
            
    );
};

export default Feedback;
        