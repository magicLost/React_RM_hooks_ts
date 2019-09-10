import React, {useEffect, useState} from 'react';
import { BUTTON_TYPE } from '../UI/Button/Button';


export interface TestProps {
    
}

type HomepageUrls = "/portfolio" | '/contact' | '/' | string;

const getIndexByUrl = (url: HomepageUrls) : number => {

    switch(url){
        case "/portfolio": return 0;
        case "/": return 1;
        case "/contact": return 2;

        default: return 1;
    }

};

//props: TestProps
const Test = () => {

    const [ index, setIndex ] = useState(1);

    let title = 'Unknown';
    let historyUrl = '';

    useEffect(() => {

        console.log("history", window.history);

        //var Backlen = window.history.length;   

        //window.history.go(-Backlen); // Return at the beginning

        const pathname: string = window.location.pathname;

        console.log(pathname);

        const newIndex = getIndexByUrl(pathname);

        if(newIndex !== index) setIndex(newIndex);

        /* if(window.history.state && window.history.state.url){

            const newIndex = getIndexByUrl(window.history.state.url);
            setIndex(newIndex);
        } 
 */
        window.addEventListener('popstate', onPopstate, false);

        return () => { window.removeEventListener('popstate', onPopstate, false); };
    }, []);
 
    const onPopstate = (event: any) => {

        console.log("popstate");
        console.log(window.history.state);

        if(window.history.state && window.history.state.url){

            const newIndex = getIndexByUrl(window.history.state.url);
            setIndex(newIndex);
        }else{
            setIndex(1);
        }
    };

    const setHistoryState = (url: HomepageUrls, hash: string) => {

        const newIndex = getIndexByUrl(url);

        window.history.pushState({url: url}, '', hash);

        setIndex(newIndex);
    };

    //const setState = 

    historyUrl = window.history.state && window.history.state.url ? window.history.state.url : '';

    //title = getTitleByUrl(historyUrl);

    console.log("TEST RENDER", index, )

    return (

        <div>
            <h3>{"Page - " + index}</h3>

            <button onClick={(event) => {

                //window.history.pushState({page: 1}, '', "/portfolio");
                setHistoryState("/portfolio", "/portfolio");

            }}>Portfolio</button>

            <button onClick={(event) => {

                //window.history.pushState({page: 1}, '', "/portfolio");
                setHistoryState("/main", "/");

            }}>Main</button>

            <button onClick={(event) => {

                setHistoryState("/contact", "/contact");

            }}>Contact</button>

            <hr />

            <button onClick={(event) => {

                window.history.back();

            }}>Back</button>

            <button onClick={(event) => {

                window.history.forward();

            }}>Forward</button>

        </div>
    );

};

export default Test;