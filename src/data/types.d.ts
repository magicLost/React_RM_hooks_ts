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

/* TEXT TO RENDER */
export type ParentElementType = "LIST" | "PARAGRAPH" | "H";
export type ChildElementType = "SPAN" | "ANCHOR" | "TEXT";

export type HType = "h1" | "h2" | "h3" | "h4" | "h5" ;

export type ChildElementOptions = {
    text?: string;
    href?:string;
    label?: string;
};

export type HeaderOptions = {
    hType: HType;
    text: string;
}

export type ChildElement = {
    type: ChildElementType;
    options: ChildElementOptions;
};

export type ParentElement = {
    type: ParentElementType;
    children?: ChildElement[];
    options?: HeaderOptions;
};


/* CONTROLS_FEATURE */
export type CFItem = {
    title: string;
    href?: string;
    viewBox?: string;
};
//export type CFTextItem = "Портфолио" | "Главное" | "Контакты";

/* MAIN PRESENTATION */
export type MainPresentationCarouselItem = {
    title: string;
    href: string;
    desc: string;
}

/* PORTFOLIO  */

export type PortfolioCategory = {
    title: string;
    href: string;
}

export type PortfolioPhotoDesc = {
    title: string;
    id: string;
    text: string;
    price: string;
}

export type PortfolioPhotosByCategory = {
    categoryName: string;
    size300: string[];
    size600: string[];
    photosDesc: PortfolioPhotoDesc[];
}
