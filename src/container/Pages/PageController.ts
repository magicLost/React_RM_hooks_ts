import {IPageClasses, IPageController} from "./interfaces";
import {IPageState} from "./../../hooks/page";
import {FORM_TYPE} from "./../../data/forms";
import {IHiddenField} from "../../container/Forms/interfaces";
import {IHistoryManager} from "./Homepage/Model/HomepageHistoryManager";


export abstract class PageController<T extends string> implements IPageController<T>{

    pageClasses: IPageClasses;
    historyManager: IHistoryManager<T>;

    setState: React.Dispatch<((prevState: IPageState) => IPageState) | IPageState> | null = null;

    created: boolean[];

    html: HTMLHtmlElement | null;

    numberOfSections: number;


    constructor(pageClasses: IPageClasses, historyManager: IHistoryManager<T>, numberOfSections: number, activeIndex: number){

        //console.log("PageController CONSTRUCTOR ", pageClasses);

        this.pageClasses = pageClasses;
        this.historyManager = historyManager;
        this.numberOfSections = numberOfSections;

        const arrayOfCreated = [];

        for(let i = 0; i < numberOfSections; i++){
            arrayOfCreated[i] = i === activeIndex;
        }

        this.created = arrayOfCreated;
        this.html = document.querySelector("html");

    }

    onSetState = (prevState: IPageState, newIndex: number, isNeedOnChangeIndex: boolean): IPageState => {

        if(this.created[newIndex] === false){
    
            this.created[newIndex] = true;

        }

        if(isNeedOnChangeIndex) this.historyManager.onChangeIndex(newIndex);

        this.pageClasses.setClassesByActiveIndex(newIndex, prevState.activeSectionIndex);

        return {
            ...prevState,
            prevSectionIndex: prevState.activeSectionIndex,
            activeSectionIndex: newIndex
        };

    }

    onDidMount = () => {

        //console.log("history", window.history);

        //var Backlen = window.history.length;   

        //window.history.go(-Backlen); // Return at the beginning

        const pathname: string = window.location.pathname;

        //console.log(pathname);

        const newIndex = this.historyManager.getIndexByUrl(pathname as T);

        if(this.setState === null) throw new Error("No setState...");

        this.setState((prevState: IPageState) => {

            if(newIndex === prevState.activeSectionIndex) return prevState;

            return this.onSetState(prevState, newIndex, false);

            /* if(this.created[newIndex] === false){
    
                this.created[newIndex] = true;

            }

            this.pageClasses.setClassesByActiveIndex(newIndex, prevState.activeSectionIndex);

            return {
                ...prevState,
                prevSectionIndex: prevState.activeSectionIndex,
                activeSectionIndex: newIndex
            }; */

        });

    };

    onPopstate = (event: any) => {

        console.log("popstate", window.history.state);
        //console.log(window.history.state);

        if(window.history.state && window.history.state.url){

            const newIndex = this.historyManager.getIndexByUrl(window.history.state.url);
            //setIndex(newIndex);

            if(this.setState === null) throw new Error("No setState...");
        
            this.setState((prevState: IPageState) => {

                if(newIndex === prevState.activeSectionIndex) return prevState;

                if(this.created[newIndex] === false){
    
                    this.created[newIndex] = true;
    
                }

                this.pageClasses.setClassesByActiveIndex(newIndex, prevState.activeSectionIndex);

                return {
                    ...prevState,
                    prevSectionIndex: prevState.activeSectionIndex,
                    activeSectionIndex: newIndex
                };

            });

        }

        const pathname: string = window.location.pathname;

        if(pathname){

            const newIndex = this.historyManager.getIndexByUrl(pathname as T);

            if(this.setState === null) throw new Error("No setState...");
    
            this.setState((prevState: IPageState) => {
    
                if(newIndex === prevState.activeSectionIndex) return prevState;

                return this.onSetState(prevState, newIndex, false);
    
               /*  if(this.created[newIndex] === false){
        
                    this.created[newIndex] = true;
    
                }
    
                this.pageClasses.setClassesByActiveIndex(newIndex, prevState.activeSectionIndex);
    
                return {
                    ...prevState,
                    prevSectionIndex: prevState.activeSectionIndex,
                    activeSectionIndex: newIndex
                }; */
    
            });

        }

    };

    onIncreaseActiveIndex = (event: any) => {

        event.stopPropagation();
        event.preventDefault();
        //TODO check index

        if(this.setState === null) throw new Error("No setState...");

        this.setState((prevState: IPageState) => {

            //console.log("prevState.activeSectionIndex", prevState.activeSectionIndex);

            if(prevState.activeSectionIndex < this.numberOfSections - 1){

                if(this.html === null) throw new Error("No html...");

                this.html.scrollTop = 0;
    
                const newIndex = prevState.activeSectionIndex + 1;
                //const prevIndex = prevState.activeSectionIndex;

                return this.onSetState(prevState, newIndex, true);
    
               /*  if(this.created[activeIndex] === false){
    
                    this.created[activeIndex] = true;
    
                }
    
                this.historyManager.onChangeIndex(activeIndex);
    
                this.pageClasses.setClassesByActiveIndex(activeIndex, prevIndex);
    
                return {
                    ...prevState,
                    prevSectionIndex: prevState.activeSectionIndex,
                    activeSectionIndex: activeIndex
                }; */
    
            }

            return prevState;
            //return null;

        });

    };

    onDecreaseActiveIndex = (event: any) => {

        //TODO check index
        event.stopPropagation();
        event.preventDefault();

        if(this.setState === null) throw new Error("No setState...");

        this.setState((prevState: IPageState) => {

            if(prevState.activeSectionIndex > 0){

                if(this.html === null) throw new Error("No html...");

                this.html.scrollTop = 0;

                const newIndex = prevState.activeSectionIndex - 1;
                //const prevIndex = prevState.activeSectionIndex;

                return this.onSetState(prevState, newIndex, true);
    
             /*    if(this.created[activeIndex] === false){
    
                    this.created[activeIndex] = true;
    
                }
    
                this.historyManager.onChangeIndex(activeIndex);

                this.pageClasses.setClassesByActiveIndex(activeIndex, prevIndex);
    
                return {
                    ...prevState,
                    prevSectionIndex: prevState.activeSectionIndex,
                    activeSectionIndex: activeIndex
                }; */

            }

            return prevState;

        });

    };

    onSetActiveIndex = (index: number) => {

        if(this.setState === null) throw new Error("No setState...");

        this.setState((prevState) => {

            if(index >= 0 && index <= this.numberOfSections - 1 && index !== prevState.activeSectionIndex){

                if(this.html === null) throw new Error("No html...");

                this.html.scrollTop = 0;

                //const activeIndex = index;
                //const prevIndex = prevState.activeSectionIndex;

                return this.onSetState(prevState, index, true);


             /*    this.historyManager.onChangeIndex(activeIndex);

                this.pageClasses.setClassesByActiveIndex(activeIndex, prevIndex);
    
                return {
                    ...prevState,
                    prevSectionIndex: prevState.activeSectionIndex,
                    activeSectionIndex: activeIndex
                }; */

            }

            return prevState;

        });

    };

    onShowForm = (formType: FORM_TYPE, hiddenFields?: IHiddenField[]) => {

        if(this.setState === null) throw new Error("No setState...");

        this.setState((prevState) => {
            return {
                ...prevState,
                isShowForm: true,
                formType: formType,
                hiddenFields: hiddenFields ? hiddenFields : []
            };
        });
    
    };

    onHideForm = (event: any) => {

        event.preventDefault();
        event.stopPropagation();

        if(this.setState === null) throw new Error("No setState...");

        this.setState((prevState) => {

            return { 
                ...prevState, 
                isShowForm: false,
                hiddenFields: []
            };

        });
    
    };

}