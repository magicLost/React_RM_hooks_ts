/* FORMS */
//Todo: change 
export type FORM_TYPE = "CALL_ME" | "FEEDBACK" | "WANNA_THE_SAME" | "CALC_PRICE";
export type FORM_ELEMENTS = "NAME" | "PHONE" | "EMAIL" | "COMMENT";

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


/* CONTROLS_FEATURE */
export type CFItem = {
    title: string;
    href?: string;
    viewBox?: string;
};
//export type CFTextItem = "Портфолио" | "Главное" | "Контакты";
