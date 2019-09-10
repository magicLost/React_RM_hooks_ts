import {IFormElementState} from "../../../../hooks/Form/form_reducer";
import {IFeedbackModel} from "./../../interfaces";
import {FORM_ELEMENTS} from "./../../../../data/forms";
import FormModel from "../../FormModel";
import {IFormValidatorChain} from "./../../../../helper/Validation/FormValidatorChain";


class FeedbackModel extends FormModel implements IFeedbackModel {

    isCallMe: boolean;

    constructor(validatorChain: IFormValidatorChain, isCallMe: boolean){
        super(validatorChain);

        this.isCallMe = isCallMe;
    }

    validateOnSubmit(stateFormElements: IFormElementState[]): string {

        let name = '';
        let email = '';
        let phone = '';

        for(let element of stateFormElements){

            switch(element.name){
                case FORM_ELEMENTS.NAME: name = element.value;break;
                case FORM_ELEMENTS.EMAIL: email = element.value;break;
                case FORM_ELEMENTS.PHONE: phone = element.value;break;
            }

        }

        if(name === ''){
            return 'Представьтесь, пожалуйста.';
        }

        if(this.isCallMe){

            if(phone === ''){
                return "Укажите ваш номер телефона иначе мы не сможем с вами связаться.";
            }
        }else{

            if(email === '' && phone === ''){
                return "Укажите ваш телефон или электронный адрес иначе мы не сможем с вами связаться.";
            }
        }

        return '';

    }

    createToken(stateFormElements: IFormElementState[]): string {

        let name = '';
        let email = '';
        let phone = '';

        for(let element of stateFormElements){

            switch(element.name){
                case FORM_ELEMENTS.NAME: name = element.value;break;
                case FORM_ELEMENTS.EMAIL: email = element.value;break;
                case FORM_ELEMENTS.PHONE: phone = element.value;break;
            }

        }

        let stringToHash = name + email + phone;

        stringToHash = encodeURI(stringToHash).substr(0, 63);

        let token = btoa(stringToHash);

        if(token.length >  64){

            token = token.substr(0, 63);

        }

        return token;
    }

    
}

export default FeedbackModel;