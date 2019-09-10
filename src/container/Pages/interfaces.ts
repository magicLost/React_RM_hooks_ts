import {IPageState} from "../../hooks/page";
import {FORM_TYPE} from "../../data/forms";
import {IHiddenField} from "../../container/Forms/interfaces";
import { IHistoryManager } from "./Homepage/Model/HomepageHistoryManager";

export type HomepageUrls = "/portfolio" | '/contact' | '/' | string;

export interface IPageClasses {

    classes: any;

    mainSectionClasses: string;
    leftSectionClasses: string;
    contactsSectionClasses: string;

    setClassesByActiveIndex: (activeIndex: number, prevIndex: number) => void | undefined;

}

export interface IPageController<T> {

    pageClasses: IPageClasses;
    historyManager: IHistoryManager<T>;

    setState: React.Dispatch<((prevState: IPageState) => IPageState) | IPageState> | null;

    numberOfSections: number;

    created: boolean[];

    html: HTMLElement | null;

    onPopstate: (event: any) => void | undefined;
    onDidMount: () => void | undefined;

    onIncreaseActiveIndex: (event: any) => void | undefined;
    onDecreaseActiveIndex: (event: any) => void | undefined;

    onSetActiveIndex: (event: any) => void | undefined;

    onShowForm: (formType: FORM_TYPE, hiddenFields: IHiddenField[]) => void | undefined;
    onHideForm: (event: any) => void | undefined;

    /* getMainSectionClasses: () => string;
    getLeftSectionClasses: () => string;
    getContactsSectionClasses: () => string; */

}

