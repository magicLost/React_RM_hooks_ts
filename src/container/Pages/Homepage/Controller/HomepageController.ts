import { PageController } from "../../PageController";
import {IHiddenField} from "../../../../container/Forms/interfaces"; 
import {IThreeSectionClasses} from "./../../types";

class HomepageController extends PageController<IThreeSectionClasses> {

    onPopstate = (event: any) => {

        event.stopPropagation();
        event.preventDefault();
        
        console.log("onPopstate");

        if(this.dispatch === undefined) throw new Error("No dispatch");

        this.dispatch({type: "POPSTATE"});
    
    };

    onIncreaseIndex = (event: any) => {

        event.stopPropagation();
        event.preventDefault();
        
        console.log("onIncreaseIndex");

        if(this.dispatch === undefined) throw new Error("No dispatch");

        this.dispatch({type: "INCREASE_INDEX"});
    
    };

    onDecreaseIndex = (event: any) => {

        event.stopPropagation();
        event.preventDefault();
        
        console.log("onDecreaseIndex");

        if(this.dispatch === undefined) throw new Error("No dispatch");

        this.dispatch({type: "DECREASE_INDEX"});
    
    };

    onSetIndex = (index: number) => {
        
        console.log("onSetIndex");

        if(this.dispatch === undefined) throw new Error("No dispatch");

        this.dispatch({type: "SET_INDEX", index: index});
    
    };

    onShowMenu = (event: any) => {

        event.preventDefault();
        event.stopPropagation();
        
        if(this.dispatch === undefined) throw new Error("No dispatch");

        this.dispatch({type: "SHOW_MODAL", modalChildrenType: "MENU", modalType: "LEFT_TAB"});

    };

    onShowCallMeForm = (event: any) => {

        event.preventDefault();
        event.stopPropagation();
        
        if(this.dispatch === undefined) throw new Error("No dispatch");

        this.dispatch({type: "SHOW_MODAL", modalChildrenType: "CALL_ME", modalType: "CENTER"});

    };

    onShowFeedbackForm = (event: any) => {

        event.preventDefault();
        event.stopPropagation();
        
        if(this.dispatch === undefined) throw new Error("No dispatch");

        this.dispatch({type: "SHOW_MODAL", modalChildrenType: "FEEDBACK", modalType: "CENTER"});

    };

    onShowWannaTheSameForm = (hiddenFields: IHiddenField[]) => {

        if(this.dispatch === undefined) throw new Error("No dispatch");

        this.dispatch({type: "SHOW_MODAL", modalChildrenType: "FEEDBACK", modalType: "CENTER", hiddenFields: hiddenFields});

    };

    onHideModal = (event: any) => {

        event.preventDefault();
        event.stopPropagation();
        
        if(this.dispatch === undefined) throw new Error("No dispatch");

        this.dispatch({type: "HIDE_MODAL"});

    };

}

export default HomepageController;