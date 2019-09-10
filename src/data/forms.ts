import { ELEMENT_TYPE } from "../component/Form/Form";
import {VALIDATOR_TYPES, IFormValidatorOptions} from "../helper/Validation/form_validators";

//import {element_type} from "../component/Form/Form";
//import {validatorTypes} from "../helper/Validation/Validators";

export type FORM_TYPE = "CALL_ME" | "FEEDBACK" | "WANNA_THE_SAME" | "CALC_PRICE"

export interface IValidatorDesc {
    name: VALIDATOR_TYPES;
    options: IFormValidatorOptions
}

export interface IFormElementDesc {

    name: FORM_ELEMENTS,
    elementType: ELEMENT_TYPE;
    elementAttrs: {
        type: string,
        name: string,
        id: string,
        placeholder?: string
    };
    labelValue: string;
    validators?: IValidatorDesc[];
    value: string;
    resize?: boolean;
} 

 export enum FORM_ELEMENTS{
    NAME = "name",
    PHONE = "phone",
    EMAIL = "email",
    COMMENT = "comment"
}

/*
export interface IFeedbackElements { 
    [FORM_ELEMENTS.NAME]: IFormElementDesc,
    [FORM_ELEMENTS.EMAIL]: IFormElementDesc,
    [FORM_ELEMENTS.PHONE]: IFormElementDesc,
    [FORM_ELEMENTS.COMMENT]: IFormElementDesc,
} */

const commentElementAttrs = {
    name: 'comment',
    type: "text",
    id: 'comment123',
    placeholder: 'Я бы хотел(а)...',
    rows: 2
}

export const feedbackElements : IFormElementDesc[] =  [

    {
        name: FORM_ELEMENTS.NAME,
        elementType: ELEMENT_TYPE.INPUT,
        elementAttrs: {
            type: 'text',
            name: 'name',
            id: 'name123',
            placeholder: 'Олимпиада'
        },
        labelValue: "Ваше имя",
        validators: [
            { name: VALIDATOR_TYPES.REGEX, options: { 
                errorMessage: "Недопустимый символ.",
                pattern: /[a-zA-ZА-Яа-я 0-9-]*/,
            }},
            { name: VALIDATOR_TYPES.LENGTH, options: { 
                errorMessage: "Имя должно содержать от двух до 100 символов.",
                min: 2, 
                max: 100
            }}
        ],
        value: ''
    },

    {

        name: FORM_ELEMENTS.EMAIL,
        elementType: ELEMENT_TYPE.INPUT,
        elementAttrs: {
            type: 'email',
            name: 'email',
            id: 'email123',
            placeholder: 'example@mail.ru'
        },
        labelValue: "Ваш электронный адрес",
        value: ''

    },

    {
        name: FORM_ELEMENTS.PHONE,
        elementType: ELEMENT_TYPE.INPUT,
        elementAttrs: {
            type: 'text',
            name: 'phone',
            id: 'phone123',
            placeholder: '921-586-34-23'
        },
        labelValue: "Ваш номер телефона",
        validators: [
            { name: VALIDATOR_TYPES.REGEX, options: { 
                errorMessage: "Недопустимый символ.",
                pattern: /[+0-9][0-9()-]*/
            }},
            { name: VALIDATOR_TYPES.LENGTH, options: { 
                errorMessage: "Минимум семь цифр.",
                min: 7, 
                max: 40
            }}
        ],
        value: ''
    },

    {
        name: FORM_ELEMENTS.COMMENT,
        elementType: ELEMENT_TYPE.TEXTAREA,
        resize: true,
        elementAttrs: commentElementAttrs,
        labelValue: "Ваш комментарий",
        value: ''
    }


]

export const callMeElements : IFormElementDesc[] =  [

    {
        name: FORM_ELEMENTS.NAME,
        elementType: ELEMENT_TYPE.INPUT,
        elementAttrs: {
            type: 'text',
            name: 'name',
            id: 'name123',
            placeholder: 'Олимпиада'
        },
        labelValue: "Ваше имя",
        validators: [
            { name: VALIDATOR_TYPES.REGEX, options: { 
                errorMessage: "Недопустимый символ.",
                pattern: /[a-zA-ZА-Яа-я 0-9-]*/,
            }},
            { name: VALIDATOR_TYPES.LENGTH, options: { 
                errorMessage: "Имя должно содержать от двух до 100 символов.",
                min: 2, 
                max: 100
            }}
        ],
        value: ''
    },

    {
        name: FORM_ELEMENTS.PHONE,
        elementType: ELEMENT_TYPE.INPUT,
        elementAttrs: {
            type: 'text',
            name: 'phone',
            id: 'phone123',
            placeholder: '921-586-34-23'
        },
        labelValue: "Ваш номер телефона",
        validators: [
            { name: VALIDATOR_TYPES.REGEX, options: { 
                errorMessage: "Недопустимый символ.",
                pattern: /[+0-9][0-9()-]*/
            }},
            { name: VALIDATOR_TYPES.LENGTH, options: { 
                errorMessage: "Минимум семь цифр.",
                min: 7, 
                max: 40
            }}
        ],
        value: ''
    }

]


/* const element = new Map<FORM_ELEMENTS, IFormElementDesc>();

element.set(FORM_ELEMENTS.NAME, feedbackElements[0]);
element.set(FORM_ELEMENTS.PHONE, feedbackElements[1]);

const name: any = "name";

element.get(name); */


