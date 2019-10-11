import {reducer} from "./page";
import * as actionCreators from "./pageAC";
import * as utility from "./utility";

let state = {};

let mainData = {};

const historyManager = {
    onChangeIndex: jest.fn(),
    getIndexByUrl: jest.fn()
};
const pageClasses = {
    setClassesByActiveIndex: jest.fn()
};


describe("usePage", () => {

    /*state: IPageState, 
    historyManager: IHistoryManager, 
    pageClasses: IPageClasses,
    mainPageData: IMainPageData,  
    newIndex: number,
    isNeedOnChangeIndex: boolean*/

    beforeEach(() => {

        historyManager.onChangeIndex.mockClear();
        historyManager.getIndexByUrl.mockClear();
        pageClasses.setClassesByActiveIndex.mockClear();

        state = {
            activeSectionIndex: 0,
            prevSectionIndex: 1,
            isShowModal: false
        };

        mainData = {
            createdSections: [true, false, false],
        
            html: null,
        
            numberOfSections: 0,
        
            modalType: "CENTER",
            modalChildrenType: "MENU",
            hiddenFields: []
        };

    });

    describe("getStateByChangeIndex", () => {

        test("It returns old state if newIndex are equals to state.activeSectionINdex", () => {

            const newIndex = 0;
            const result = utility.getStateByChangeIndex(state, historyManager, pageClasses, mainData, newIndex, false);
            expect(result === state).toEqual(true);

        });

        test("It must set createdSections, call to setClassesByActiveIndex and return new state", () => {

            const newIndex = 2;
            const result = utility.getStateByChangeIndex(state, historyManager, pageClasses, mainData, newIndex, false);
            
            expect(pageClasses.setClassesByActiveIndex).toHaveBeenCalledTimes(1);
            expect(historyManager.onChangeIndex).toHaveBeenCalledTimes(0);
            expect(mainData.createdSections).toEqual([true, false, true]);
            expect(result === state).toEqual(false);
            expect(result).toEqual({
                activeSectionIndex: 2,
                prevSectionIndex: 0,
                isShowModal: false
            });

        });

        test("It must all to onChangeIndex if isNeedOnChangeINdex", () => {

            const newIndex = 2;
            const result = utility.getStateByChangeIndex(state, historyManager, pageClasses, mainData, newIndex, true);
            
            expect(pageClasses.setClassesByActiveIndex).toHaveBeenCalledTimes(1);
            expect(historyManager.onChangeIndex).toHaveBeenCalledTimes(1);
            expect(mainData.createdSections).toEqual([true, false, true]);
            expect(result === state).toEqual(false);

        });

    });

    describe("didMountAC", () => {

        test("It must call historyManager.getIndexByUrl and when call to getStateByChangeIndex", () => {

            utility.getStateByChangeIndex = jest.fn();
            utility.getStateByChangeIndex.mockReturnValue({value: "hello"});

            historyManager.getIndexByUrl.mockReturnValue(2);

            const result = actionCreators.didMountAC(state, {}, historyManager, pageClasses, mainData);
            
            expect(historyManager.getIndexByUrl).toHaveBeenNthCalledWith(1, "/");

            expect(utility.getStateByChangeIndex).toHaveBeenNthCalledWith(1, state, historyManager, pageClasses, mainData, 2, false);

            expect(result).toEqual({value: "hello"});

        });

    });


});