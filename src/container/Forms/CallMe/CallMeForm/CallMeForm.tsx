import React, {useMemo} from 'react';
import classes from './CallMeForm.module.scss';

import Input from "../../../../component/FormElements/Input/Input";
import Form from "../../../../component/Form/Form";

import {IFormElementDesc} from "../../../../data/forms";
import {IFormElementState} from "../../../../hooks/Form/form_reducer";

        
interface CallMeFormProps  {
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

const CallMeForm = ({
    formElements, 
    formError, 
    formMessage, 
    formElementsState, 
    onChange, 
    onSubmit, 
    onClear, 
    isSuccess,
    onSuccess,
    isLoading}: CallMeFormProps) => {
    return (
        
        <div className={classes.CallMeForm}>

            <Form 
                onSubmit={onSubmit}
                onClear={onClear} 
                formError={formError} 
                formMessage={formMessage} 
                isLoading={isLoading}
                isSuccess={isSuccess}
                onSuccess={onSuccess}
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

            </Form>

        </div>
            
    );
};

export default CallMeForm;
        