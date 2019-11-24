import React from "react";
import { IPageState, PageAction } from "../../hooks/Page/page";
import { FORM_TYPE } from "../../data/feedback_forms_data";
import { IHiddenField } from "../Forms/interfaces";
import { ModalType } from "../../component/Modal/Modal";

/* HISTORY MANAGER */
export type Url = "/";

export type PageUrl = "/portfolio" | "/contact" | "/";

export interface IHistoryManager {
  getIndexByUrl: (url: PageUrl) => number;
  getUrlByIndex: (index: number) => PageUrl;
  setHistoryState: (url: PageUrl) => void | undefined;

  onChangeIndex: (index: number) => void | undefined;

  getIndexByLocationPath: () => number;

  getLocationPathname: () => string;
}

export abstract class HistoryManager implements IHistoryManager {
  abstract getIndexByUrl: (url: PageUrl) => number;
  abstract getUrlByIndex: (index: number) => PageUrl;

  getIndexByLocationPath = (): number => {
    //get location name
    const pathname: string = this.getLocationPathname();

    //get index by location name
    return this.getIndexByUrl(pathname as PageUrl);

    //see if index the same as index in state
  };

  getLocationPathname = (): string => {
    return window.location.pathname;
  };

  onChangeIndex = (index: number) => {
    const url = this.getUrlByIndex(index);
    this.setHistoryState(url);
  };

  setHistoryState = (url: PageUrl) => {
    //const newIndex = this.getIndexByUrl(url);

    window.history.pushState({ url: url }, "", url);
  };
}

/* PAGE CLASSES */

export interface IClasses {
  mainSectionClasses: string;
  contactsSectionClasses: string;
}

export interface IThreeSectionClasses extends IClasses {
  leftSectionClasses: string;
}

export interface IPageClasses<T> {
  defaultClasses: any;

  classes: T;

  setClassesByActiveIndex: (
    activeIndex: number,
    prevIndex: number
  ) => void | undefined;
}

/* PAGE CONTROLLER */
export interface IPageController<T> {
  dispatch: React.Dispatch<PageAction> | undefined;
  reducer: (state: IPageState, action: PageAction) => IPageState;

  pageClasses: IPageClasses<T>;
  historyManager: IHistoryManager;

  numberOfSections: number;

  createdSections: boolean[];

  html: HTMLHtmlElement | null;

  modalType: ModalType;
  modalChildrenType: FORM_TYPE | "MENU";
  hiddenFields: IHiddenField[];

  onInitState: () => { activeIndex: number; prevIndex: number };

  //getActiveSectionIndexOnInit: () => number;
  //getPrevSectionIndexOnInit: (activeSectionIndex: number) => number;

  onPopstate: (event: any) => void | undefined;
  onIncreaseIndex: (event: any) => void | undefined;
  onDecreaseIndex: (event: any) => void | undefined;
  onSetIndex: (index: number) => void | undefined;
  onShowCallMeForm: (event: any) => void | undefined;
  onShowWannaTheSameForm: (id: string) => void | undefined;
  onShowMenu: (event: any) => void | undefined;
  onHideModal: (event: any) => void | undefined;

  popstateAC: (state: IPageState, action: PageAction) => IPageState;

  increaseIndexAC: (state: IPageState, action: PageAction) => IPageState;
  decreaseIndexAC: (state: IPageState, action: PageAction) => IPageState;

  setIndexAC: (state: IPageState, action: PageAction) => IPageState;

  showModalFromTopAC: (state: IPageState, action: PageAction) => IPageState;
  showModalFromLeftAC: (state: IPageState, action: PageAction) => IPageState;
  hideModalAC: (state: IPageState, action: PageAction) => IPageState;

  getClasses: () => T;
  //getLeftSectionClasses: () => string;
  //getContactsSectionClasses: () => string;
}
