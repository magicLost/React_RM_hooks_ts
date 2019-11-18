import {useState, useRef, MutableRefObject} from 'react';
import {CFConfig, IControlsFeatureController} from "./../../container/ControlsFeature/types";
import {CFState} from "./types";

import {CFItem} from "./../../data/types";
import ControlsFeatureController from '../../container/ControlsFeature/Controller/ControlsFeatureController';
import ControlsFeatureClasses from '../../container/ControlsFeature/Model/ControlsFeatureClasses';


export const useControlsFeature = (

    items: CFItem[], 
    itemClickHandler: (event: any) => void | undefined, 
    classes: any, 
    config: CFConfig) => 
{

    const controllerRef: MutableRefObject<IControlsFeatureController | null> = useRef(null);

    const [ state, setState ] = useState((): CFState => {

        const cfClasses = new ControlsFeatureClasses(items.length, classes, config);

        //const controller: IControlsFeatureController = new ControlsFeatureController(items, cfClasses, itemClickHandler);
        controllerRef.current = new ControlsFeatureController(items, cfClasses, itemClickHandler);

        return {
            //controller: controller,
            isShowItems: false,
            title: '',
            mainItemText: items[1].title
        };

    });

    if(controllerRef.current === null) throw new Error("No controller");

    controllerRef.current.setState = setState;

    return {
        controller: controllerRef.current,
        isShowItems: state.isShowItems,
        title: state.title,
        mainItemText: state.mainItemText
    }

}