import { PageController } from "../../PageController";
import {IHiddenField} from "../../../../container/Forms/interfaces"; 
import {HomepageUrls} from "./../../interfaces";

class HomepageController extends PageController<HomepageUrls> {

    onShowCallMeForm = (event: any) => {

        event.preventDefault();
        event.stopPropagation();
        
        this.onShowForm("CALL_ME");

    };

    onShowFeedbackForm = (event: any) => {

        event.preventDefault();
        event.stopPropagation();
        
        this.onShowForm("FEEDBACK");

    };

    onShowWannaTheSameForm = (hiddenFields: IHiddenField[]) => {

        /*event.preventDefault();
        event.stopPropagation();

        const id = event.target.dataset.jobId;*/
        
        this.onShowForm(
            "WANNA_THE_SAME",
            hiddenFields
        );

    };

    getMainSectionClasses = () => {

        return this.pageClasses.mainSectionClasses;

    }

    getLeftSectionClasses = () => {

        return this.pageClasses.leftSectionClasses;

    }

    getContactsSectionClasses = () => {

        return this.pageClasses.contactsSectionClasses;

    }

}

export default HomepageController;