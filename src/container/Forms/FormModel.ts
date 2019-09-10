import {IHiddenField, IFormModel} from "./interfaces";
import {IFormElementState} from "../../hooks/Form/form_reducer";
import {IValidatorDesc, IFormElementDesc} from "./../../data/forms";
import {IFormValidatorChain} from "./../../helper/Validation/FormValidatorChain";
import {ELEMENT_TYPE} from "./../../component/Form/Form";

export default abstract class FormModel implements IFormModel{

    validatorChain: IFormValidatorChain;

    constructor(validatorChain: IFormValidatorChain){
        this.validatorChain = validatorChain;
    }

    abstract validateOnSubmit(stateFormElements: IFormElementState[]): string;

    getFormData(stateFormElements: IFormElementState[], hiddenFields: IHiddenField[]): FormData {

        const formData = new FormData();

        for(let element of stateFormElements){

            let value = element.file !== undefined ? element.file : element.value;
            formData.append(element.name, value);

        }

        if(hiddenFields !== undefined && hiddenFields.length > 0){

            for(let field of hiddenFields){
    
                formData.append(field.name, field.value);
    
            }
    
        }

        return new FormData();
    }

    hasInputsError(stateFormElements: IFormElementState[], formError: string): boolean {

        /* if(formError !== '')
            return true; */

        for(let element of stateFormElements){

            if(element.errors.length !== 0) return true;

        }

        return false;
    }

    //validators: IValidatorDesc[] | undefined
    inputValidation(target: any, formElements: IFormElementDesc[]): IFormElementState{

        if(target.name === undefined || target.value === undefined) throw new Error("No name or value on target");

        const name = target.name;
        const value = target.value;
        const fileList: FileList = target.type === 'file' ? target.files : null;

        //create new data without errors
        const data: IFormElementState  = {

            name: name,
            value: value,
            errors: []
            
        };
    
        if(fileList)
            data.file = fileList[0];

        //if value empty we return no error
        if(value === '') return data;

        //validation
        let errors: string[] = [];

        const validators: IValidatorDesc[] | undefined = this.getValidatorsDesc(name, formElements);

        if(validators !== undefined){

            if(fileList){
                if(!this.validatorChain.isValid(fileList[0], validators)){
                    errors = this.validatorChain.getErrorMessages();
                }
            }else{
                if(!this.validatorChain.isValid(value, validators)){
                    errors = this.validatorChain.getErrorMessages();
                }
    
            }
        
        }

        data.errors = errors;

        return data;

    }

    getFormElementsInitState(formElements: IFormElementDesc[]): IFormElementState[]{

        const formElementsState = [];

        for(let element of formElements){

            formElementsState.push({ name: element.name, value: '', errors: []});

        }

        return formElementsState;

    }

    getValidatorsDesc(name: string, formElements: IFormElementDesc[]): IValidatorDesc[] | undefined {

        for(let element of formElements){
            if(element.name === name){
                return element.validators;
            }
        }

        return undefined;

    } 

}

