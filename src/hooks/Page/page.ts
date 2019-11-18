import {useRef, useReducer, useEffect} from 'react';
import { ModalType } from "../../component/Modal/Modal";
import { FORM_TYPE } from "../../data/forms";
import { IHiddenField } from "../../container/Forms/interfaces";
import { IPageController } from "../../container/Pages/types";
//import { IHistoryManager, HistoryManager } from "../../container/Pages/types";
import ThreeSectionsPageClasses from "../../container/Pages/Homepage/Model/ThreeSectionsPageClasses";
import HomepageHistoryManager from "../../container/Pages/Homepage/Model/HomepageHistoryManager";
//import {didMountAC, popstateAC, increaseIndexAC, decreaseIndexAC, setIndexAC, showModalAC, hideModalAC} from './pageAC';
import HomepageController from '../../container/Pages/Homepage/Controller/HomepageController';
import {IClasses} from "./../../container/Pages/types";

//export type homepageUrlHash = "" | "" | "#contacts";
export type Pages = "HOMEPAGE" | "LARGEPRINT";

export type PageActions = "POPSTATE" | "INCREASE_INDEX" | "DECREASE_INDEX" | "SET_INDEX" | "SHOW_MODAL_TOP" | "SHOW_MODAL_LEFT" | "HIDE_MODAL";

export type PageAction = {
    type: PageActions,
    index?: number,
    modalType?: ModalType,
    modalChildrenType?: FORM_TYPE | "MENU",
    hiddenFields?: IHiddenField[]
}


export interface IPageState {

    activeSectionIndex: number;
    prevSectionIndex: number;

    isShowModalFromLeft: boolean;
    isShowModalFromTop: boolean;

}

export const getController = (pageType: Pages, classes: any, commonClasses: any, numberOfSections: number): IPageController<IClasses> => {

    switch(pageType) {

        case "HOMEPAGE": return new HomepageController(new ThreeSectionsPageClasses(classes, commonClasses), new HomepageHistoryManager(), numberOfSections)

        default: throw new Error("No implementation for type " + pageType);
    }
};

export const usePage = (pageType: Pages, classes: any, commonClasses: any, numberOfSections: number) => {

    const isInitRef: React.MutableRefObject<boolean> = useRef(false);

    const controllerRef: React.MutableRefObject<IPageController<IClasses> | null> = useRef(null);

    if(isInitRef.current === false){
        controllerRef.current = getController(pageType, classes, commonClasses, numberOfSections);
        isInitRef.current = true;
    }
    
    if(controllerRef.current === null) throw new Error("NO controller");

    const [ state, dispatch ] = useReducer(controllerRef.current.reducer, undefined, () => {

        if(controllerRef.current === null) throw new Error("NO controller");

        const { activeIndex, prevIndex } = controllerRef.current.onInitState();

        return {
            activeSectionIndex: activeIndex,
            prevSectionIndex: prevIndex,
            isShowModalFromLeft: false,
            isShowModalFromTop: false
        };
    });

    controllerRef.current.dispatch = dispatch;

    //controllerRef.current.onInit(state.activeSectionIndex);

    useEffect(() => {

        //console.log("useEffect - DID_MOUNT");

        if(controllerRef.current === null) throw new Error("NO controller");

        //dispatch({type: "DID_MOUNT"});

        window.addEventListener('popstate', controllerRef.current.onPopstate, false);

        return () => { 
            if(controllerRef.current === null) throw new Error("NO controller"); 
            window.removeEventListener('popstate', controllerRef.current.onPopstate, false); 
        };

    }, []);


    return {

        controller: controllerRef.current,

        activeSectionIndex: state.activeSectionIndex,
        isShowModalFromLeft: state.isShowModalFromLeft,
        isShowModalFromTop: state.isShowModalFromTop,

        sectionsClasses: controllerRef.current.getClasses(),

        createdSections: controllerRef.current.createdSections,

        modalType: controllerRef.current.modalType,
        modalChildrenType: controllerRef.current.modalChildrenType,
        hiddenFields: controllerRef.current.hiddenFields
    }
};

