import {IPageState, PageAction} from "./../../hooks/Page/page";
import {FORM_TYPE} from "./../../data/forms";
import {IHiddenField} from "../../container/Forms/interfaces";
import {IHistoryManager, IPageClasses, IPageController, PageUrl, IClasses} from "./types";
import { ModalType } from "../../component/Modal/Modal";


export abstract class PageController<T extends IClasses> implements IPageController<T>{

    dispatch: React.Dispatch<PageAction> | undefined;

    pageClasses: IPageClasses<T>;
    historyManager: IHistoryManager;

    createdSections: boolean[];

    html: HTMLHtmlElement | null;

    numberOfSections: number;

    modalType: ModalType = "CENTER";
    modalChildrenType: FORM_TYPE | "MENU" = "CALL_ME";
    hiddenFields: IHiddenField[] = [];

    abstract onPopstate: (event: any) => void | undefined;
    abstract onIncreaseIndex: (event: any) => void | undefined;
    abstract onDecreaseIndex: (event: any) => void | undefined;
    abstract onSetIndex: (index: number) => void | undefined;
    abstract onShowCallMeForm: (event: any) => void | undefined;
    abstract onShowWannaTheSameForm: (id: string) => void | undefined;
    abstract onShowMenu: (event: any) => void | undefined;
    abstract onHideModal: (event: any) => void | undefined;


    constructor(pageClasses: IPageClasses<T>, historyManager: IHistoryManager, numberOfSections: number){

        //console.log("PageController CONSTRUCTOR ", pageClasses);

        this.pageClasses = pageClasses;
        this.historyManager = historyManager;
        this.numberOfSections = numberOfSections;

        const arrayOfCreated = [];

        for(let i = 0; i < numberOfSections; i++){
            arrayOfCreated[i] = false;
        }

        this.createdSections = arrayOfCreated;
        this.html = document.querySelector("html");
    }

    protected getStateByChangeIndex = (state: IPageState, newIndex: number, isNeedOnChangeIndex: boolean) : IPageState => {
    
    
        if(newIndex === state.activeSectionIndex) return state;
    
        
        if(this.createdSections[newIndex] === false){
        
            this.createdSections[newIndex] = true;
        }
    
        if(isNeedOnChangeIndex) this.historyManager.onChangeIndex(newIndex);
    
        this.pageClasses.setClassesByActiveIndex(newIndex, state.activeSectionIndex);
    
        return {
            ...state,
            prevSectionIndex: state.activeSectionIndex,
            activeSectionIndex: newIndex
        };
    
    };

    reducer = (state: IPageState, action: PageAction) => {

        console.log(action.type, state);
    
        switch(action.type){
        
            case "POPSTATE": return this.popstateAC(state, action);
    
            case "INCREASE_INDEX": return this.increaseIndexAC(state, action);
    
            case "DECREASE_INDEX": return this.decreaseIndexAC(state, action);
    
            case "SET_INDEX": return this.setIndexAC(state, action);
    
            case "SHOW_MODAL_TOP": return this.showModalFromTopAC(state, action);

            case "SHOW_MODAL_LEFT": return this.showModalFromLeftAC(state, action);
    
            case "HIDE_MODAL": return this.hideModalAC(state, action);
        }
    
        throw new Error("No implementation for action type - " + action.type);
    }

    getClasses = () => {

        return this.pageClasses.classes;

    }

    onInitState = (): {activeIndex: number, prevIndex: number} => {

        const activeIndex = this.getActiveSectionIndexOnInit();

        this.createdSections[activeIndex] = true;

        return {
            activeIndex: activeIndex,
            prevIndex: this.getPrevSectionIndexOnInit(activeIndex)
        };

    }; 

    getActiveSectionIndexOnInit = () => {

        return this.historyManager.getIndexByLocationPath();

    };

    getPrevSectionIndexOnInit = (activeSectionIndex: number) => {

        if(activeSectionIndex === 0) return 1;

        return activeSectionIndex - 1;
    };

    popstateAC = (state: IPageState, action: PageAction): IPageState => {

        console.log("popstate", window.history.state);
        //console.log(window.history.state);

        if(window.history.state && window.history.state.url){

            const newIndex = this.historyManager.getIndexByUrl(window.history.state.url);
            //setIndex(newIndex);
    
            return this.getStateByChangeIndex(state, newIndex, false);
        }
    
        const pathname: string = window.location.pathname;
    
        if(pathname){
    
            const newIndex = this.historyManager.getIndexByUrl(pathname as PageUrl);
    
            return this.getStateByChangeIndex(state, newIndex, false);
    
        }
    
        return state;

    };

    increaseIndexAC = (state: IPageState, action: PageAction): IPageState => {

        if(state.activeSectionIndex < this.numberOfSections - 1){

            if(this.html === null) throw new Error("No html...");
    
            this.html.scrollTop = 0;
    
            const newIndex = state.activeSectionIndex + 1;
    
            return this.getStateByChangeIndex(state, newIndex, true);
    
        }

        return state;
    };

    decreaseIndexAC = (state: IPageState, action: PageAction): IPageState => {

         if(state.activeSectionIndex > 0){

            if(this.html === null) throw new Error("No html...");

            this.html.scrollTop = 0;

            const newIndex = state.activeSectionIndex - 1;

            return this.getStateByChangeIndex(state, newIndex, true);

        }

        return state;
    };

    setIndexAC = (state: IPageState, action: PageAction): IPageState => {

        if(action.index === undefined) throw new Error("No index");

        if(action.index >= 0 && action.index <= this.numberOfSections - 1 && action.index !== state.activeSectionIndex){

            if(this.html === null) throw new Error("No html...");

            this.html.scrollTop = 0;

            return this.getStateByChangeIndex(state, action.index, true);

        }

        return state;
    };

    showModalFromTopAC = (state: IPageState, action: PageAction): IPageState => {

        if(action.modalType === undefined || action.modalChildrenType === undefined) throw new Error("No modalType or modalChildrenType")

        this.modalType = action.modalType;
        this.modalChildrenType = action.modalChildrenType;
        this.hiddenFields = action.hiddenFields ? action.hiddenFields : [];

        return { 
            ...state, 
            isShowModalFromTop: true,
            isShowModalFromLeft: false
        };
    };

    showModalFromLeftAC = (state: IPageState, action: PageAction): IPageState => {

        if(action.modalType === undefined || action.modalChildrenType === undefined) throw new Error("No modalType or modalChildrenType")

        this.modalType = action.modalType;
        this.modalChildrenType = action.modalChildrenType;
        this.hiddenFields = action.hiddenFields ? action.hiddenFields : [];

        return { 
            ...state, 
            isShowModalFromTop: false,
            isShowModalFromLeft: true
        };
    };

    hideModalAC = (state: IPageState, action: PageAction): IPageState => {

        this.hiddenFields = [];

        return { 
            ...state, 
            isShowModalFromLeft: false,
            isShowModalFromTop: false
        };
    };
}