import {useState} from "react";
import {FORM_TYPE} from "../data/forms";
import {IHiddenField} from "../container/Forms/interfaces";
import HomepageController from "../container/Pages/Homepage/Controller/HomepageController";
import ThreeSectionsPageClasses from "../container/Pages/Homepage/Model/ThreeSectionsPageClasses";
import HomepageHistoryManager from "../container/Pages/Homepage/Model/HomepageHistoryManager";



export type homepageUrlHash = "" | "" | "#contacts";
export type Pages = "HOMEPAGE" | "LARGEPRINT";

export interface IPageState {

    controller: any;

    activeSectionIndex: number;
    prevSectionIndex: number;

    isShowForm: boolean;
    formType: FORM_TYPE;
    hiddenFields: IHiddenField[],

    //urlHash: homepageUrlHash

    //isShowSlider: boolean;

}

export const usePage = (pageType: Pages, classes: any, commonClasses: any, activeIndex: number, prevIndex: number) => {

    const [state, setState] = useState(() => {

        let controller;

        const initState: IPageState = {

            controller: null,
    
            activeSectionIndex: activeIndex,
            prevSectionIndex: prevIndex,
    
            //FORMS
            isShowForm: true,
            formType: "CALL_ME",
            hiddenFields: [],
        };

        if(pageType === "HOMEPAGE"){
            controller = new HomepageController(
                new ThreeSectionsPageClasses(classes, commonClasses),
                new HomepageHistoryManager(),
                3, 1
            )
        }

        initState.controller = controller;

        return initState;

    });

    state.controller.setState = setState;

    return {
        controller: state.controller,
        activeSectionIndex: state.activeSectionIndex, 
        isShowForm: state.isShowForm, 
        formType: state.formType, 
        hiddenFields: state.hiddenFields
    };

}
