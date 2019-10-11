import {useState} from "react";
import {ScrollerState} from "./types";
import ScrollerController from "../../../container/Scrollers/Scroller/Controller/ScrollerController";
import CalcTranslateX from "../../../container/Scrollers/Scroller/Model/CalcTranslateX";
import IdentifyEvent from "../../../container/Scrollers/Scroller/Model/IdentifyEvent";
import ShowContentHelper from "../../../container/Scrollers/Scroller/Model/ShowContentHelper";


export const useScroller = () => {

    const [state, setState] = useState(() => {

        const controller = new ScrollerController(
            new CalcTranslateX(),
            new IdentifyEvent(),
            new ShowContentHelper()
        );

        const initState: ScrollerState = {

            controller: controller,
            translateX: 0,
            isNeedScroller: false,
    
            numberOfActiveItems: 0
        };

        return initState;

    });

    state.controller.setState = setState;

    return { 
        
        controller: state.controller, 
        translateX: state.translateX, 
        isNeedScroller: state.isNeedScroller, 
        numberOfActiveItems: state.numberOfActiveItems 
    };

}; 