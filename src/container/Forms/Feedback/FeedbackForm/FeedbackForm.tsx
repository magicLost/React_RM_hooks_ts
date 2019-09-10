import React, { useMemo } from 'react';
import classes from './FeedbackForm.module.scss';

import Input from "../../../../component/FormElements/Input/Input";
import Textarea from "../../../../component/FormElements/Textarea/Textarea";
import Form from "../../../../component/Form/Form";

import {IFormElementDesc} from "../../../../data/forms";
import {IFormElementState} from "../../../../hooks/Form/form_reducer";

interface FeedbackFormProps  {

    formElements: IFormElementDesc[];
    formElementsState: IFormElementState[];
    formError: string;
    formMessage: string;
    
    onSubmit: (event: {}) => void;
    onClear: (event: {}) => void;
    onChange: (event: {}) => void;

    isLoading?: boolean;
    isSuccess?: boolean;
    onSuccess?: (event: {}) => void;

}

const FeedbackForm = ({
    formElements, 
    formError, 
    formMessage, 
    formElementsState, 
    onChange, 
    onSubmit, 
    onClear, 
    isSuccess,
    onSuccess,
    isLoading}: FeedbackFormProps) => {

    return (
        
        <div className={classes.FeedbackForm}>

            <Form 
                onSubmit={onSubmit} 
                onClear={onClear} 
                formError={formError} 
                formMessage={formMessage} 
                isSuccess={isSuccess}
                onSuccess={onSuccess}
                isLoading={isLoading}
            >

                { useMemo(() => (
                    <Input 
                        elementAttrs={formElements[0].elementAttrs} 
                        disabled={isLoading} 
                        onChange={onChange} 
                        value={formElementsState[0].value} 
                        labelValue={formElements[0].labelValue}
                        error={formElementsState[0].errors.length > 0 ? formElementsState[0].errors[0] : '' }
                    />
                ), [formElementsState[0].value, formElementsState[0].errors]) }

                { useMemo(() => (
                    <Input 
                        elementAttrs={formElements[1].elementAttrs} 
                        disabled={isLoading} 
                        onChange={onChange} 
                        value={formElementsState[1].value} 
                        labelValue={formElements[1].labelValue}
                        error={formElementsState[1].errors.length > 0 ? formElementsState[1].errors[0] : '' }
                    />
                ), [formElementsState[1].value, formElementsState[1].errors]) }

                { useMemo(() => (
                    <Input 
                        elementAttrs={formElements[2].elementAttrs} 
                        disabled={isLoading} 
                        onChange={onChange} 
                        value={formElementsState[2].value} 
                        labelValue={formElements[2].labelValue} 
                        error={formElementsState[2].errors.length > 0 ? formElementsState[2].errors[0] : '' }
                    />
                ), [formElementsState[2].value, formElementsState[2].errors]) }

                { useMemo(() => (
                    <Textarea 
                        elementAttrs={formElements[3].elementAttrs}
                        disabled={isLoading} 
                        onChange={onChange} 
                        value={formElementsState[3].value} 
                        labelValue={formElements[3].labelValue} 
                        error={formElementsState[3].errors.length > 0 ? formElementsState[3].errors[0] : '' } 
                        isResize={true} 
                    />
                ), [formElementsState[3].value, formElementsState[3].errors]) } 

            </Form>

        </div>
            
    );
};

export default FeedbackForm;
        