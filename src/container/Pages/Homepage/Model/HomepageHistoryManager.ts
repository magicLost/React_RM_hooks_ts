//import {HistoryManager, PageUrl} from "./../../types";
import {HistoryManager, PageUrl} from "../../types";

class HomepageHistoryManager extends HistoryManager {

    getIndexByUrl  = (url: PageUrl) : number => {

        switch(url){
            case "/portfolio": return 0;
            case "/": return 1;
            case "/contact": return 2;
    
            default: return 1;
        }
    
    };

    getUrlByIndex  = (index: number) : PageUrl => {

        switch(index){
            case 0: return "/portfolio";
            case 1: return "/";
            case 2: return "/contact";
    
            default: return "/";
        }
    
    };
}

export default HomepageHistoryManager;