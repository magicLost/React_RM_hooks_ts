import {HomepageUrls} from "../../interfaces";

export interface IHistoryManager<T>{

    getIndexByUrl: (url: T) => number;
    getUrlByIndex: (index: number) => T;
    setHistoryState: (url: T) => void | undefined;

    onChangeIndex: (index: number) => void | undefined;
}

export abstract class HistoryManager<T extends string> implements IHistoryManager<T>{

    abstract getIndexByUrl: (url: T) => number;
    abstract getUrlByIndex: (index: number) => T;

    onChangeIndex = (index: number) => {

        const url = this.getUrlByIndex(index);
        this.setHistoryState(url);

    };

    setHistoryState = (url: T) => {

        //const newIndex = this.getIndexByUrl(url);

        window.history.pushState({url: url}, '', url);

    };
}

class HomepageHistoryManager extends HistoryManager<HomepageUrls> {

    getIndexByUrl  = (url: HomepageUrls) : number => {

        switch(url){
            case "/portfolio": return 0;
            case "/": return 1;
            case "/contact": return 2;
    
            default: return 1;
        }
    
    };

    getUrlByIndex  = (index: number) : HomepageUrls => {

        switch(index){
            case 0: return "/portfolio";
            case 1: return "/";
            case 2: return "/contact";
    
            default: return "/";
        }
    
    };
    

}

export default HomepageHistoryManager;