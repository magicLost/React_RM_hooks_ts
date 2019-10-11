import {useRef, useReducer, useEffect} from 'react';
import { ModalType } from "../../component/Modal/Modal";
import { FORM_TYPE } from "../../data/forms";
import { IHiddenField } from "../../container/Forms/interfaces";
import { IPageClasses, IPageController } from "../../container/Pages/types";
import { IHistoryManager, HistoryManager } from "../../container/Pages/types";
import ThreeSectionsPageClasses from "../../container/Pages/Homepage/Model/ThreeSectionsPageClasses";
import HomepageHistoryManager from "../../container/Pages/Homepage/Model/HomepageHistoryManager";
//import {didMountAC, popstateAC, increaseIndexAC, decreaseIndexAC, setIndexAC, showModalAC, hideModalAC} from './pageAC';
import HomepageController from '../../container/Pages/Homepage/Controller/HomepageController';
import {IClasses} from "./../../container/Pages/types";

//export type homepageUrlHash = "" | "" | "#contacts";
export type Pages = "HOMEPAGE" | "LARGEPRINT";

export type PageActions = "DID_MOUNT" | "POPSTATE" | "INCREASE_INDEX" | "DECREASE_INDEX" | "SET_INDEX" | "SHOW_MODAL" | "HIDE_MODAL";

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

    isShowModal: boolean;

}

export const getController = (pageType: Pages, classes: any, commonClasses: any, numberOfSections: number, activeIndex: number): IPageController<IClasses> => {

    switch(pageType) {

        case "HOMEPAGE": return new HomepageController(new ThreeSectionsPageClasses(classes, commonClasses), new HomepageHistoryManager(), numberOfSections, activeIndex)

        default: throw new Error("No implementation for type " + pageType);
    }
};

export const usePage = (pageType: Pages, classes: any, commonClasses: any, activeIndex: number, prevIndex: number, numberOfSections: number) => {

    const isInitRef: React.MutableRefObject<boolean> = useRef(false);

    const controllerRef: React.MutableRefObject<IPageController<IClasses> | null> = useRef(null);

    if(isInitRef.current === false){
        controllerRef.current = getController(pageType, classes, commonClasses, numberOfSections, activeIndex);
        isInitRef.current = true;
    }

    /* const reducer = (state: IPageState, action: PageAction) => {

        console.log(action.type, state);

        if(controllerRef.current === null) throw new Error("NO controller");
    
        switch(action.type){
    
            case "DID_MOUNT": return controllerRef.current.didMountAC(state, action);
    
            case "POPSTATE": return controllerRef.current.popstateAC(state, action);
    
            case "INCREASE_INDEX": return controllerRef.current.increaseIndexAC(state, action);
    
            case "DECREASE_INDEX": return controllerRef.current.decreaseIndexAC(state, action);
    
            case "SET_INDEX": return controllerRef.current.setIndexAC(state, action);
    
            case "SHOW_MODAL": return controllerRef.current.showModalAC(state, action);
    
            case "HIDE_MODAL": return controllerRef.current.hideModalAC(state, action);
        }
    
        throw new Error("No implementation for action type - " + action.type);
    } */
    
    if(controllerRef.current === null) throw new Error("NO controller");

    const [ state, dispatch ] = useReducer(controllerRef.current.reducer, undefined, () => {

        //controllerRef.current = getController(pageType, classes, commonClasses, numberOfSections, activeIndex);

        return {
            activeSectionIndex: activeIndex,
            prevSectionIndex: prevIndex,
            isShowModal: false
        };
    });

    controllerRef.current.dispatch = dispatch;

    useEffect(() => {

        console.log("useEffect - DID_MOUNT");

        if(controllerRef.current === null) throw new Error("NO controller");

        dispatch({type: "DID_MOUNT"});

        window.addEventListener('popstate', controllerRef.current.onPopstate, false);

        return () => { 
            if(controllerRef.current === null) throw new Error("NO controller"); 
            window.removeEventListener('popstate', controllerRef.current.onPopstate, false); 
        };

    }, []);

    //const {mainData, historyManager, pageClasses} = pageData.current;

    //if(historyManager === undefined || pageClasses === undefined) throw new Error("NO historyManager or pageClasses");

    return {

        //pageData: mainData,
        //pageClasses: pageClasses,
        controller: controllerRef.current,

        activeSectionIndex: state.activeSectionIndex,
        isShowModal: state.isShowModal,

        sectionsClasses: controllerRef.current.getClasses(),

        createdSections: controllerRef.current.createdSections,

        modalType: controllerRef.current.modalType,
        modalChildrenType: controllerRef.current.modalChildrenType,
        hiddenFields: controllerRef.current.hiddenFields
        //dispatch: dispatch
    }
};


/////////NO need

export interface IMainPageData {

    createdSections: boolean[],

    html: HTMLHtmlElement | null,

    numberOfSections: number,

    modalType: ModalType;
    modalChildrenType: FORM_TYPE | "MENU";
    hiddenFields: IHiddenField[]
}

export interface IPageData {

    pageClasses?: IPageClasses<IClasses>,

    historyManager?: IHistoryManager,

    mainData: IMainPageData
}


const initPageData: IPageData = {

    pageClasses: undefined,//new ThreeSectionsPageClasses(classes, commonClasses),
    historyManager: undefined,
    mainData: {
        createdSections: [],

        html: null,

        numberOfSections: 0,

        modalType: "CENTER",
        modalChildrenType: "MENU",
        hiddenFields: []
    }
};



/* import {useRef, useReducer, useEffect} from 'react';

import { ModalType } from "../../component/Modal/Modal";
import { FORM_TYPE } from "../../data/forms";
import { IHiddenField } from "../../container/Forms/interfaces";
import { IPageClasses } from "../../container/Pages/types";
import { IHistoryManager, HistoryManager } from "../../container/Pages/types";
import ThreeSectionsPageClasses from "../../container/Pages/Homepage/Model/ThreeSectionsPageClasses";
import HomepageHistoryManager from "../../container/Pages/Homepage/Model/HomepageHistoryManager";
import {didMountAC, popstateAC, increaseIndexAC, decreaseIndexAC, setIndexAC, showModalAC, hideModalAC} from './pageAC';

//export type homepageUrlHash = "" | "" | "#contacts";
export type Pages = "HOMEPAGE" | "LARGEPRINT";

export type PageActions = "DID_MOUNT" | "POPSTATE" | "INCREASE_INDEX" | "DECREASE_INDEX" | "SET_INDEX" | "SHOW_MODAL" | "HIDE_MODAL";

export type PageAction = {
    type: PageActions,
    index?: number,
    modalType?: "CENTER",
    modalChildrenType?: FORM_TYPE | "MENU",
    hiddenFields?: []
}

export interface IMainPageData {

    createdSections: boolean[],

    html: HTMLHtmlElement | null,

    numberOfSections: number,

    modalType: ModalType;
    modalChildrenType: FORM_TYPE | "MENU";
    hiddenFields: IHiddenField[]
}

export interface IPageData {

    pageClasses?: IPageClasses,

    historyManager?: IHistoryManager,

    mainData: IMainPageData
}

export interface IPageState {

    activeSectionIndex: number;
    prevSectionIndex: number;

    isShowModal: boolean;

}

export const getHelperClasses = (pageType: Pages, classes: any, commonClasses: any): {pageClasses: IPageClasses, historyManager: IHistoryManager} => {

    switch(pageType) {
        case "HOMEPAGE": return {
            pageClasses: new ThreeSectionsPageClasses(classes, commonClasses),
            historyManager: new HomepageHistoryManager()
        };

        default: throw new Error("No implementation for type " + pageType);
    }

};

const initPageData: IPageData = {

    pageClasses: undefined,//new ThreeSectionsPageClasses(classes, commonClasses),
    historyManager: undefined,
    mainData: {
        createdSections: [],

        html: null,

        numberOfSections: 0,

        modalType: "CENTER",
        modalChildrenType: "MENU",
        hiddenFields: []
    }
};



export const usePage = (pageType: Pages, classes: any, commonClasses: any, activeIndex: number, prevIndex: number, numberOfSections: number) => {

    const pageData: React.MutableRefObject<IPageData> = useRef(initPageData);

    const reducer = (state: IPageState, action: PageAction) => {

        console.log(action.type, state);
    
        const {mainData, historyManager, pageClasses} = pageData.current;
    
        if(historyManager === undefined || pageClasses === undefined) throw new Error("NO historyManager or pageClasses");
    
        switch(action.type){
    
            case "DID_MOUNT": return didMountAC(state, action, historyManager, pageClasses, mainData);
    
            case "POPSTATE": return popstateAC(state, action, historyManager, pageClasses, mainData);
    
            case "INCREASE_INDEX": return increaseIndexAC(state, action, historyManager, pageClasses, mainData);
    
            case "DECREASE_INDEX": return decreaseIndexAC(state, action, historyManager, pageClasses, mainData);
    
            case "SET_INDEX": return setIndexAC(state, action, historyManager, pageClasses, mainData);
    
            case "SHOW_MODAL": return showModalAC(state, action, mainData);
    
            case "HIDE_MODAL": return hideModalAC(state, action);
        }
    
        throw new Error("No implementation for action type - " + action.type);
    }
    

    const [ state, dispatch ] = useReducer(reducer, pageData, (pageData: React.MutableRefObject<IPageData>) => {

        const {pageClasses, historyManager} = getHelperClasses(pageType, classes, commonClasses);

        const arrayOfCreated = [];

        for(let i = 0; i < numberOfSections; i++){
            arrayOfCreated[i] = i === activeIndex;
        }

        pageData.current.historyManager = historyManager;
        pageData.current.pageClasses = pageClasses;
        pageData.current.mainData.html = document.querySelector('html');
        pageData.current.mainData.createdSections = arrayOfCreated;

        return {
            activeSectionIndex: activeIndex,
            prevSectionIndex: prevIndex,
            isShowModal: false
        };
    });

    const onPopstate = (event: any) => {

        event.stopPropagation();
        event.preventDefault();
        
        console.log("onPopstate");

        dispatch({type: "POPSTATE"});
    
    };

    useEffect(() => {

        console.log("useEffect - DID_MOUNT");

        dispatch({type: "DID_MOUNT"});

        window.addEventListener('popstate', onPopstate, false);

        return () => { window.removeEventListener('popstate', onPopstate, false); };

    }, []);

    const {mainData, historyManager, pageClasses} = pageData.current;

    if(historyManager === undefined || pageClasses === undefined) throw new Error("NO historyManager or pageClasses");

    return {

        pageData: mainData,
        pageClasses: pageClasses,
        activeSectionIndex: state.activeSectionIndex,
        isShowModal: state.isShowModal,
        dispatch: dispatch
    }
}; */